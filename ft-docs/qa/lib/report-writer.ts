/**
 * Report writer — generates markdown summary from QA JSON report.
 */
import * as fs from "fs";
import * as path from "path";

const REPORTS_DIR = path.resolve(__dirname, "../reports");

interface TestResult {
  title: string;
  status: "passed" | "failed" | "skipped";
  duration: number;
  errors?: string[];
}

interface ComponentReport {
  component: string;
  checks: TestResult[];
  status: "pass" | "fail" | "warn";
}

export function generateMarkdownReport(jsonReportPath: string): string {
  const raw = JSON.parse(fs.readFileSync(jsonReportPath, "utf-8"));
  const suites = raw.suites || [];

  const components = new Map<string, ComponentReport>();

  function walkSuites(suite: any, parentTitle = "") {
    const title = parentTitle ? `${parentTitle} > ${suite.title}` : suite.title;
    for (const spec of suite.specs || []) {
      // Extract component name from test title pattern: "Component Name > check name"
      const parts = title.split(" > ");
      const componentName = parts.find((p: string) => /^[A-Z]/.test(p)) || title;

      if (!components.has(componentName)) {
        components.set(componentName, { component: componentName, checks: [], status: "pass" });
      }
      const report = components.get(componentName)!;
      const status = spec.ok ? "passed" : "failed";
      report.checks.push({
        title: spec.title,
        status,
        duration: spec.tests?.[0]?.results?.[0]?.duration || 0,
        errors: spec.ok ? undefined : spec.tests?.[0]?.results?.[0]?.errors?.map((e: any) => e.message),
      });
      if (!spec.ok) report.status = "fail";
    }
    for (const child of suite.suites || []) {
      walkSuites(child, title);
    }
  }

  for (const suite of suites) {
    walkSuites(suite);
  }

  const total = components.size;
  const passed = [...components.values()].filter((c) => c.status === "pass").length;
  const failed = total - passed;

  let md = `# Component QA Report\n\n`;
  md += `**Date:** ${new Date().toISOString().split("T")[0]}\n`;
  md += `**Total:** ${total} | **Passed:** ${passed} | **Failed:** ${failed}\n\n`;

  if (failed > 0) {
    md += `## Failed Components\n\n`;
    for (const [name, report] of components) {
      if (report.status !== "fail") continue;
      md += `### ${name}\n\n`;
      for (const check of report.checks) {
        if (check.status === "failed") {
          md += `- **FAIL:** ${check.title}\n`;
          if (check.errors) {
            for (const err of check.errors) {
              md += `  - ${err.split("\n")[0]}\n`;
            }
          }
        }
      }
      md += "\n";
    }
  }

  md += `## All Components\n\n`;
  md += `| Component | Status | Checks | Failed |\n`;
  md += `|-----------|--------|--------|--------|\n`;
  for (const [name, report] of components) {
    const failCount = report.checks.filter((c) => c.status === "failed").length;
    md += `| ${name} | ${report.status === "pass" ? "PASS" : "FAIL"} | ${report.checks.length} | ${failCount} |\n`;
  }

  return md;
}

export function writeMarkdownReport(jsonReportPath: string): void {
  const md = generateMarkdownReport(jsonReportPath);
  const outPath = path.join(REPORTS_DIR, "qa-report-latest.md");
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  fs.writeFileSync(outPath, md);
}
