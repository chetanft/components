'use strict';

const { execFileSync } = require('child_process');

/**
 * Timestamp npm run sync:docs should use so output matches check:docs-sync / committed HEAD.
 */
function getHeadDocSyncTimestamp(projectRoot) {
  try {
    const raw = execFileSync(
      'git',
      ['show', 'HEAD:docs/generated/component-design-specs.json'],
      { cwd: projectRoot, encoding: 'utf8' }
    );
    const { generatedAt } = JSON.parse(raw);
    return typeof generatedAt === 'string' && generatedAt.length > 0 ? generatedAt : null;
  } catch {
    return null;
  }
}

module.exports = { getHeadDocSyncTimestamp };
