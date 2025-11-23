"use client"

import { useState, useEffect } from "react"
import {
  AppHeader,
  QuickFilters,
  Table,
  Button,
  Badge,
  Input,
  Dropdown,
  DatePicker,
  Tabs,
  SegmentedTabs,
  Checkbox,
  Icon,
} from "../../../../../src"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"
import { ArrowLeft, Code, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock journey data matching the design
const mockJourneys = [
  {
    journey_id: 1,
    feed_unique_id: "PB 09 HH6439",
    origin_company_display: "MDC Labs,\nAmritsar",
    origin_display: "Amritsar",
    origin_state: "Punjab",
    destination_company_display: "Tata Motors,\nPune",
    destination_display: "Pune",
    destination_state: "Maharashtra",
    sla_status: "on_time",
    eta_display: "15 Sep, 2024",
    alert_type: "long_stoppage",
    trip_type_display: "Outbound - Source",
    status: "in-transit",
    vehicle_id: "PB09 HH 6439",
    transporter: "Yonex Transporter",
    sim_number: "84973-47593",
    tracking_type: "SIM",
    current_status: "On Road",
    current_location: "Ambala, Haryana",
  },
  {
    journey_id: 2,
    feed_unique_id: "KA12 AS 3421",
    origin_company_display: "MDC Labs,\nAmritsar",
    origin_display: "Amritsar",
    origin_state: "Punjab",
    destination_company_display: "Tata Motors,\nMumbai",
    destination_display: "Mumbai",
    destination_state: "Maharashtra",
    sla_status: "delayed",
    eta_display: "16 Sep, 2024",
    alert_type: "route_deviation",
    trip_type_display: "Inbound",
    status: "in-transit",
    vehicle_id: "KA12 AS 3421",
    transporter: "Yonex Transporter",
    sim_number: "84973-47593",
    tracking_type: "SIM",
    current_status: "At Drop",
    current_location: "Mumbai, Maharashtra",
  },
  {
    journey_id: 3,
    feed_unique_id: "PB 09 CD5678",
    origin_company_display: "MDC Labs,\nAmritsar",
    origin_display: "Amritsar",
    origin_state: "Punjab",
    destination_company_display: "Tata Motors,\nDelhi",
    destination_display: "Delhi",
    destination_state: "Delhi",
    sla_status: "on_time",
    eta_display: "17 Sep, 2024",
    alert_type: null,
    trip_type_display: "Outbound - Source",
    status: "in-transit",
    vehicle_id: "PB09 CD 5678",
    transporter: "Yonex Transporter",
    sim_number: "84973-47593",
    tracking_type: "GPS",
    current_status: "On Road",
    current_location: "Delhi, Delhi",
  },
  {
    journey_id: 4,
    feed_unique_id: "PB 09 EF9012",
    origin_company_display: "MDC Labs,\nAmritsar",
    origin_display: "Amritsar",
    origin_state: "Punjab",
    destination_company_display: "Tata Motors,\nBangalore",
    destination_display: "Bangalore",
    destination_state: "Karnataka",
    sla_status: "on_time",
    eta_display: "18 Sep, 2024",
    alert_type: "long_stoppage",
    trip_type_display: "Outbound - Source",
    status: "in-transit",
    vehicle_id: "PB09 EF 9012",
    transporter: "Yonex Transporter",
    sim_number: "84973-47593",
    tracking_type: "SIM",
    current_status: "At Pickup",
    current_location: "Amritsar, Punjab",
  },
  {
    journey_id: 5,
    feed_unique_id: "PB 09 GH3456",
    origin_company_display: "MDC Labs,\nAmritsar",
    origin_display: "Amritsar",
    origin_state: "Punjab",
    destination_company_display: "Tata Motors,\nChennai",
    destination_display: "Chennai",
    destination_state: "Tamil Nadu",
    sla_status: "delayed",
    eta_display: "19 Sep, 2024",
    alert_type: null,
    trip_type_display: "Inbound",
    status: "in-transit",
    vehicle_id: "PB09 GH 3456",
    transporter: "Yonex Transporter",
    sim_number: "84973-47593",
    tracking_type: "SIM",
    current_status: "On Road",
    current_location: "Chennai, Tamil Nadu",
  },
  {
    journey_id: 6,
    feed_unique_id: "PB 09 IJ7890",
    origin_company_display: "MDC Labs,\nAmritsar",
    origin_display: "Amritsar",
    origin_state: "Punjab",
    destination_company_display: "Tata Motors,\nHyderabad",
    destination_display: "Hyderabad",
    destination_state: "Telangana",
    sla_status: "on_time",
    eta_display: "20 Sep, 2024",
    alert_type: "route_deviation",
    trip_type_display: "Outbound - Source",
    status: "in-transit",
    vehicle_id: "PB09 IJ 7890",
    transporter: "Yonex Transporter",
    sim_number: "84973-47593",
    tracking_type: "GPS",
    current_status: "On Road",
    current_location: "Hyderabad, Telangana",
  },
]

export default function MyJourneys01Page() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/blocks"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blocks
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">My Journeys Listing Page</h1>
            <p className="text-muted-foreground">
              A comprehensive listing page with filters, tabs, table view, and responsive card view
            </p>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Preview</h2>
                <div className="flex items-center gap-2">
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    <Code className="h-4 w-4" />
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-0 bg-background" style={{ backgroundColor: "var(--bg-secondary)" }}>
              <MyJourneysPreview />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function MyJourneysPreview() {
  const [selectedTab, setSelectedTab] = useState(3) // In Transit is default (tab index 3)
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJourneyIds, setSelectedJourneyIds] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const [dateRangeStart, setDateRangeStart] = useState<string>("2024-08-12")
  const [dateRangeEnd, setDateRangeEnd] = useState<string>("2024-09-12")
  const [isMobile, setIsMobile] = useState(false)

  const user = {
    name: "John Doe",
    role: "Admin",
    location: "Mumbai",
    badge: "Admin",
  }

  // Status map to match tab indices correctly
  // Tab indices: 0=Planned, 1=En Route, 2=At Loading, 3=In Transit, 4=At Unloading, 5=In Return, 6=Delivered
  const statusMap: Record<number, string> = {
    0: "planned",
    1: "en-route-loading",
    2: "at-loading",
    3: "in-transit", // Tab index 3 = "In Transit"
    4: "at-unloading",
    5: "in-return",
    6: "delivered",
  }

  // Filter journeys based on selected tab
  const getFilteredJourneysByTab = () => {
    const status = statusMap[selectedTab]
    
    // For demo: show all journeys for "In Transit" tab (index 3), filter others by status
    // In production, this would filter by actual journey status
    let filtered: typeof mockJourneys
    if (selectedTab === 3) {
      // "In Transit" tab - show all journeys for demo
      filtered = mockJourneys
    } else if (status) {
      filtered = mockJourneys.filter((j) => j.status === status)
    } else {
      filtered = mockJourneys
    }
    
    return filtered.map((journey) => ({
      ...journey,
      id: journey.journey_id,
    }))
  }

  const journeys = getFilteredJourneysByTab()

  // Tabs configuration matching design
  const tabs = [
    { label: "Planned", badge: true, badgeCount: 56 },
    { label: "En Route to Loading", badge: true, badgeCount: 56 },
    { label: "At Loading", badge: true, badgeCount: 56 },
    { label: "In Transit", badge: true, badgeCount: 56 },
    { label: "At Unloading", badge: true, badgeCount: 56 },
    { label: "In Return", badge: true, badgeCount: 56 },
    { label: "Delivered", badge: true, badgeCount: 56 },
  ]

  // Quick Filters matching design
  const quickFilters = [
    { id: "stoppage", label: "Long Stoppage", count: 19, type: "alert" as const },
    { id: "deviation", label: "Route Deviation", count: 19, type: "alert" as const },
    {
      id: "delayed",
      label: "Delayed",
      count: 51,
      type: "alert" as const,
      options: [
        { id: "0-6hrs", label: "0-6 hrs", count: 28, type: "alert" as const },
        { id: "6-12hrs", label: "6-12 hrs", count: 18, type: "alert" as const },
        { id: "12plus", label: "12+ hrs", count: 5, type: "alert" as const },
      ],
    },
    {
      id: "eway",
      label: "E Way bill",
      type: "normal" as const,
      options: [
        { id: "expiring", label: "Expiring in 3 hrs", count: 28, type: "alert" as const },
        { id: "expired", label: "Expired", count: 18, type: "alert" as const },
      ],
    },
    {
      id: "eta",
      label: "ETA",
      type: "normal" as const,
      options: [
        { id: "6hrs", label: "6 hrs", count: 28, type: "alert" as const },
        { id: "12hrs", label: "12 hrs", count: 18, type: "alert" as const },
        { id: "24plus", label: "24+ hrs", count: 5, type: "alert" as const },
      ],
    },
  ]

  // Table columns matching design
  const columns = [
    {
      key: "checkbox",
      title: "",
      width: "48px", // Fixed width for checkbox column
      render: (_: any, journey: any) => (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={selectedJourneyIds.includes(journey.journey_id)}
            onChange={(checked) => {
              setSelectedJourneyIds((prev) =>
                checked
                  ? [...prev, journey.journey_id]
                  : prev.filter((id) => id !== journey.journey_id)
              )
            }}
          />
          <Icon name="star" style={{ width: "16px", height: "16px", color: "var(--secondary)" }} />
        </div>
      ),
    },
    {
      key: "feed_unique_id",
      title: "Feed Unique ID",
      width: "200px",
      render: (_: any, journey: any) => (
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-sm truncate">{journey.feed_unique_id}</span>
          <a href="#" className="text-xs text-blue-600 hover:underline whitespace-nowrap">View ID's</a>
        </div>
      ),
    },
    {
      key: "from",
      title: "From",
      width: "200px",
      render: (_: any, journey: any) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-sm font-medium truncate">
              {journey.origin_display}, {journey.origin_state}
            </span>
            <Badge variant="normal" className="text-xs px-1 py-0 h-5 flex-shrink-0">
              +1P
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground truncate">
            {journey.origin_company_display.split(",")[0]}
          </span>
        </div>
      ),
    },
    {
      key: "to",
      title: "To",
      width: "200px",
      render: (_: any, journey: any) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-sm font-medium truncate">
              {journey.destination_display}, {journey.destination_state.substring(0, 4)}...
            </span>
            <Badge variant="normal" className="text-xs px-1 py-0 h-5 flex-shrink-0">
              +3D
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground truncate">
            {journey.destination_company_display.split(",")[0].substring(0, 20)}...
          </span>
        </div>
      ),
    },
    {
      key: "vehicle_info",
      title: "Vehicle Info",
      width: "200px",
      render: (_: any, journey: any) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-sm font-medium truncate">{journey.vehicle_id}</span>
            <Icon name="question" style={{ width: "14px", height: "14px" }} className="flex-shrink-0" />
          </div>
          <span className="text-xs text-muted-foreground truncate">
            {journey.transporter} &gt;
          </span>
        </div>
      ),
    },
    {
      key: "trip_info",
      title: "Trip Info",
      width: "200px",
      render: (_: any, journey: any) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <Icon name="sim" style={{ width: "16px", height: "16px" }} className="flex-shrink-0" />
            <span className="text-xs truncate">{journey.tracking_type}</span>
            <Icon name="check" style={{ width: "14px", height: "14px", color: "#10b981" }} className="flex-shrink-0" />
          </div>
          <span className="text-xs text-muted-foreground truncate pl-[24px]">{journey.sim_number}</span>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      width: "200px",
      render: (_: any, journey: any) => (
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <Icon 
              name="truck" 
              style={{ 
                width: "16px", 
                height: "16px", 
                color: journey.sla_status === "delayed" ? "#ef4444" : "var(--primary)" 
              }}
              className="flex-shrink-0"
            />
            <span className="text-sm font-medium truncate">{journey.current_status}</span>
          </div>
          <span className="text-xs text-muted-foreground truncate">{journey.current_location}</span>
        </div>
      ),
    },
    {
      key: "sla",
      title: "SLA",
      width: "200px",
      render: (_: any, journey: any) => (
        <div className="flex flex-col gap-1 min-w-0">
          <Badge variant={journey.sla_status === "on_time" ? "success" : "danger"} className="w-fit">
            {journey.sla_status === "on_time" ? "On time" : "Delayed by 13 hr"}
          </Badge>
          <span className="text-xs text-muted-foreground truncate">ETA: {journey.eta_display}</span>
        </div>
      ),
    },
    {
      key: "alerts",
      title: "Alerts",
      width: "200px",
      render: (_: any, journey: any) => {
        if (!journey.alert_type) return <span className="text-xs text-muted-foreground">-</span>
        const alertLabels: Record<string, string> = {
          long_stoppage: "Long Stoppage",
          route_deviation: "Route Deviation",
        }
        return (
          <div className="flex flex-col gap-1">
            <Badge variant="danger" className="text-xs w-fit">
              {alertLabels[journey.alert_type] || journey.alert_type}
            </Badge>
            <span className="text-xs text-muted-foreground">1 hour ago</span>
          </div>
        )
      },
    },
    {
      key: "actions",
      title: "Actions",
      width: "80px", // Fixed width for actions column
      render: (_: any) => (
        <div className="flex items-center gap-2">
          <Button variant="text" icon="more" iconPosition="only" size="md" />
          <Button variant="secondary" icon="chevron-right" iconPosition="only" size="md" />
        </div>
      ),
    },
  ]

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 800)
    }
    checkScreenWidth()
    window.addEventListener("resize", checkScreenWidth)
    return () => window.removeEventListener("resize", checkScreenWidth)
  }, [])

  const filteredJourneys =
    activeFilters.size > 0
      ? journeys.filter((journey) => {
          return Array.from(activeFilters).some((filter) => {
            if (filter === "stoppage") return journey.alert_type === "long_stoppage"
            if (filter === "deviation") return journey.alert_type === "route_deviation"
            return true
          })
        })
      : journeys

  const tableData = filteredJourneys.map((journey) => ({
    ...journey,
    id: journey.id || journey.journey_id,
  }))

  // Mobile card render
  const renderJourneyCard = (journey: any) => {
    const isOnTime = journey.sla_status === "on_time"
    const hasAlert = !!journey.alert_type

    return (
      <div
        key={journey.journey_id}
        style={{
          padding: isMobile ? "16px 10px" : "var(--space-4)",
          marginBottom: isMobile ? "16px" : "var(--space-3)",
          border: "1px solid var(--border-primary)",
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--bg-primary)",
          width: isMobile ? "100%" : "100%",
          maxWidth: isMobile ? "340px" : "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "16px" : "var(--space-4)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <div style={{
              fontSize: isMobile ? "18px" : "var(--font-size-md)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--primary)",
              lineHeight: "1.4",
            }}>
              {journey.feed_unique_id}
            </div>
            {hasAlert && (
              <Badge variant="danger" style={{
                backgroundColor: "#ffeaea",
                color: "#e43634",
                border: "none",
                padding: "3px 8px",
                borderRadius: "5px",
                fontSize: "12px",
                fontWeight: "var(--font-weight-semibold)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}>
                <Icon name="alert-critical-fill" style={{ width: "16px", height: "17px" }} />
                +2
              </Badge>
            )}
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "8px" : "var(--space-4)",
            width: "100%",
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flex: "0 0 152px",
              paddingRight: "8px",
            }}>
              <div style={{
                fontSize: "var(--font-size-md)",
                color: "var(--secondary)",
                lineHeight: "1.4",
                whiteSpace: "pre-wrap",
              }}>
                {journey.origin_company_display}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{
                  fontSize: "var(--font-size-md)",
                  color: "var(--primary)",
                  lineHeight: "1.4",
                }}>
                  {journey.origin_display}
                </span>
                <Badge variant="normal" style={{
                  backgroundColor: "#f0f1f7",
                  border: "1px solid var(--border-primary)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--primary)",
                  width: "24px",
                  height: "21px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  +1
                </Badge>
              </div>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <Icon name="chevron-right" style={{
                width: "16px",
                height: "16px",
                color: "var(--primary)",
                transform: "rotate(180deg)",
              }} />
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flex: "0 0 152px",
              paddingLeft: "8px",
              alignItems: "flex-end",
            }}>
              <div style={{
                fontSize: "var(--font-size-md)",
                color: "var(--secondary)",
                lineHeight: "1.4",
                textAlign: "right",
                whiteSpace: "pre-wrap",
              }}>
                {journey.destination_company_display}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", justifyContent: "flex-end" }}>
                <span style={{
                  fontSize: "var(--font-size-md)",
                  color: "var(--primary)",
                  lineHeight: "1.4",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "116px",
                }}>
                  {journey.destination_display}
                </span>
                <Badge variant="normal" style={{
                  backgroundColor: "#f0f1f7",
                  border: "1px solid var(--border-primary)",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--primary)",
                  width: "24px",
                  height: "21px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  +3
                </Badge>
              </div>
            </div>
          </div>

          <div style={{
            height: "1px",
            width: "100%",
            backgroundColor: "#f0f1f7",
            margin: "0",
          }} />

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "8px",
          }}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flex: "1 0 0",
              paddingRight: "8px",
            }}>
              <Badge
                variant={isOnTime ? "success" : "danger"}
                style={{
                  backgroundColor: isOnTime ? "#dfffe8" : "#ffeaea",
                  color: isOnTime ? "#00763d" : "#ff3533",
                  border: "none",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "var(--font-weight-semibold)",
                  width: "fit-content",
                  height: "21px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isOnTime ? "On time" : "Delayed by 13 hr"}
              </Badge>
              <div style={{
                fontSize: "12px",
                color: "var(--secondary)",
                fontWeight: "var(--font-weight-medium)",
                lineHeight: "1.4",
              }}>
                ETA: {journey.eta_display}
              </div>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              flex: "1 0 0",
              paddingLeft: "8px",
              alignItems: "flex-end",
            }}>
              <Badge variant="success" style={{
                backgroundColor: "#dfffe8",
                color: "#00763d",
                border: "none",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "var(--font-weight-semibold)",
                width: "fit-content",
                height: "21px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center",
              }}>
                <Icon name="strength-high" style={{ width: "16px", height: "16px" }} />
                Tracking Active
              </Badge>
              <div style={{
                fontSize: "12px",
                color: "var(--secondary)",
                fontWeight: "var(--font-weight-medium)",
                lineHeight: "1.4",
                textAlign: "right",
                whiteSpace: "pre-wrap",
              }}>
                Tracking: {journey.trip_type_display}
              </div>
            </div>
          </div>

          <div style={{
            height: "1px",
            width: "100%",
            backgroundColor: "#f0f1f7",
            margin: "0",
          }} />

          <div style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}>
            <Button
              variant="secondary"
              icon="more"
              iconPosition="only"
              size="md"
              data-circular="true"
            />
            <Button
              variant="secondary"
              icon="share"
              iconPosition="only"
              size="md"
              data-circular="true"
            />
            <Button
              variant="secondary"
              className="rounded-full"
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              View
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: "var(--bg-secondary)", minHeight: "100vh" }}>
      <AppHeader user={user} />

      <div className="my-journeys-container" style={{
        backgroundColor: "var(--bg-primary)",
        paddingLeft: isMobile ? "10px" : "20px",
        paddingRight: isMobile ? "10px" : "20px",
        paddingBottom: isMobile ? "100px" : "20px",
      }}>
        {/* Title Bar */}
        {!isMobile ? (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <Icon name="navigator" style={{ width: "28px", height: "28px", color: "var(--primary)" }} />
              <h1 style={{
                margin: 0,
                fontSize: "var(--font-size-xl)",
                fontWeight: 600,
                color: "var(--primary)",
                fontFamily: "var(--font-family-primary)",
              }}>
                My Journeys
              </h1>
            </div>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              height: "var(--component-height-md)",
            }}>
              <Dropdown
                options={[
                  { value: "mdc-labs", label: "MDC Labs, Amritsar" },
                  { value: "all", label: "All Companies" },
                ]}
                placeholder="Select company"
                defaultValue="mdc-labs"
                style={{ height: "var(--component-height-md)" }}
              />

              <DatePicker
                range={true}
                startValue={dateRangeStart}
                endValue={dateRangeEnd}
                onStartChange={(value: string) => setDateRangeStart(value)}
                onEndChange={(value: string) => setDateRangeEnd(value)}
                placeholder="12 Aug, 2024 → 12 Sep 2024"
                style={{
                  width: "fit-content",
                  minWidth: "fit-content",
                  flexShrink: 0,
                  height: "var(--component-height-md)",
                  border: "none",
                  boxShadow: "none",
                }}
              />

              <Dropdown
                options={[
                  { value: "outbound", label: "Outbound - Source" },
                  { value: "inbound", label: "Inbound" },
                ]}
                placeholder="Direction"
                defaultValue="outbound"
                style={{ height: "var(--component-height-md)", width: "200px" }}
              />

              <Input
                placeholder="Search My Journeys"
                leadingIcon="search"
                value={searchTerm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                style={{ width: "300px", flexShrink: 0, height: "var(--component-height-md)" }}
              />

              <Button
                variant="primary"
                icon="add"
                style={{
                  height: "var(--component-height-md)",
                  backgroundColor: "var(--primary)",
                  color: "white",
                  borderRadius: "6px",
                }}
              >
                Add Journey
              </Button>
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: "var(--bg-primary)",
            padding: "12px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "8px",
            marginBottom: "0",
          }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
              <Icon name="navigator" style={{ width: "20px", height: "20px", color: "var(--primary)" }} />
              <h1 style={{
                margin: 0,
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--primary)",
                fontFamily: "var(--font-family-primary)",
                lineHeight: "1.4",
              }}>
                My Journeys
              </h1>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Button variant="text" style={{ width: "24px", height: "24px", padding: "2px", minWidth: "24px" }}>
                <Icon name="filter" style={{ width: "12px", height: "12px", color: "var(--primary)" }} />
              </Button>
              <Button variant="text" style={{ width: "24px", height: "24px", padding: "2px", minWidth: "24px" }}>
                <Icon name="search" style={{ width: "12px", height: "12px", color: "var(--primary)" }} />
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Quick Filters */}
        {isMobile && (
          <div style={{
            backgroundColor: "var(--bg-primary)",
            padding: "12px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}>
            <div style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              width: "100%",
              overflowX: "auto",
              overflowY: "hidden",
            }}>
              <div style={{
                border: "1px solid var(--border-primary)",
                borderRadius: "8px",
                height: "36px",
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
                width: "169px",
              }}>
                <span style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF3533",
                  lineHeight: "normal",
                }}>
                  19
                </span>
                <span style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--primary)",
                  lineHeight: "1.4",
                }}>
                  Long Stoppage
                </span>
              </div>

              <div style={{
                border: "1px solid var(--border-primary)",
                borderRadius: "8px",
                height: "36px",
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flexShrink: 0,
                width: "169px",
              }}>
                <span style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  color: "#FF3533",
                  lineHeight: "normal",
                }}>
                  19
                </span>
                <span style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--primary)",
                  lineHeight: "1.4",
                }}>
                  Route Deviation
                </span>
              </div>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "32px",
              padding: "0 12px",
            }}>
              <div style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--primary)",
                lineHeight: "1.4",
              }}>
                {filteredJourneys.length} Vehicles available
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Button variant="text" style={{ width: "32px", height: "32px", padding: 0, minWidth: "32px" }}>
                  <Icon name="filter" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                </Button>
                <Button variant="text" style={{ width: "32px", height: "32px", padding: 0, minWidth: "32px" }}>
                  <Icon name="sort" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                </Button>
                <Button variant="text" style={{ width: "32px", height: "32px", padding: 0, minWidth: "32px" }}>
                  <Icon name="more" style={{ width: "16px", height: "16px", color: "var(--primary)" }} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tabs + View Toggle */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: isMobile ? "0" : "20px",
          width: "100%",
          gap: "var(--space-4)",
          height: isMobile ? "48px" : "auto",
          overflowX: isMobile ? "auto" : "visible",
          overflowY: "hidden",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2)",
            flex: "1 1 0%",
            minWidth: 0,
            maxWidth: "100%",
            position: "relative",
            whiteSpace: "nowrap",
            padding: isMobile ? "12px 0" : "0 var(--space-2)",
            overflow: isMobile ? "visible" : "hidden",
            height: isMobile ? "48px" : "auto",
          }}>
            <Tabs
              tabs={tabs}
              activeTab={selectedTab}
              onTabChange={setSelectedTab}
            />
          </div>
          {!isMobile && (
            <SegmentedTabs
              variant="icon-only"
              items={[
                {
                  value: "list",
                  icon: <Icon name="hamburger-menu" style={{ width: "16px", height: "16px" }} />,
                  label: "",
                },
                {
                  value: "map",
                  icon: <Icon name="map" style={{ width: "16px", height: "16px" }} />,
                  label: "",
                },
              ]}
              value={viewMode}
              onChange={(value: string) => setViewMode(value as "list" | "map")}
            />
          )}
        </div>

        {/* Quick Filters - Desktop Only */}
        {!isMobile && (
          <div 
            className="quick-filter-scroll" 
            style={{ 
              marginBottom: "20px",
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <style>{`
              .quick-filter-scroll .quick-filter-row {
                display: flex !important;
                flex-wrap: nowrap !important;
                gap: 8px !important;
                width: max-content !important;
                min-width: 100% !important;
                padding-bottom: 0 !important;
              }
              .quick-filter-scroll .quick-filter-row > * {
                flex-shrink: 0 !important;
              }
              /* Hide scrollbar but keep functionality */
              .quick-filter-scroll {
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
              }
              .quick-filter-scroll::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
              }
            `}</style>
            <QuickFilters
              className="quick-filter-row"
              filters={quickFilters}
              onFilterClick={(filterId: string, optionId?: string) => {
                const filterKey = optionId ? `${filterId}:${optionId}` : filterId
                setActiveFilters((prev) => {
                  const next = new Set(prev)
                  if (next.has(filterKey)) {
                    next.delete(filterKey)
                  } else {
                    next.add(filterKey)
                  }
                  return next
                })
              }}
              onFilterRemove={(filterId: string, optionId?: string) => {
                const filterKey = optionId ? `${filterId}:${optionId}` : filterId
                setActiveFilters((prev) => {
                  const next = new Set(prev)
                  next.delete(filterKey)
                  return next
                })
              }}
            />
          </div>
        )}

        {/* Actions Row - Desktop Only */}
        {!isMobile && (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            backgroundColor: "var(--bg-primary)",
            borderRadius: "var(--radius-md)",
          }}>
            <div style={{
              color: "var(--primary)",
              fontSize: "var(--font-size-md)",
              fontWeight: "var(--font-weight-semibold)",
              fontFamily: "var(--font-family-primary)",
            }}>
              {selectedJourneyIds.length > 0
                ? `${selectedJourneyIds.length} journeys selected`
                : `${filteredJourneys.length} journeys available`}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
              <Button variant="tertiary" icon="star" iconPosition="only" size="md" />
              <Button variant="tertiary" icon="download" iconPosition="only" size="md" />
              <Button variant="tertiary" icon="filter" iconPosition="only" size="md" />
              <Button variant="tertiary" icon="hamburger-menu" iconPosition="only" size="md" />
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2)",
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-primary)",
                borderRadius: "var(--radius-md)",
                paddingTop: "var(--space-1)",
                paddingBottom: "var(--space-1)",
                height: "32px",
              }}>
                <Button
                  variant="text"
                  style={{ width: "24px", height: "24px", padding: 0 }}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                >
                  <Icon name="chevron-left" style={{ width: "16px", height: "16px", color: "var(--secondary)" }} />
                </Button>
                <span style={{
                  fontSize: "var(--font-size-sm)",
                  color: "var(--primary)",
                  minWidth: "20px",
                  textAlign: "center",
                }}>
                  {page}
                </span>
                <Button
                  variant="text"
                  style={{ width: "24px", height: "24px", padding: 0 }}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  <Icon name="chevron-right" style={{ width: "16px", height: "16px", color: "var(--secondary)" }} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Table or Card View */}
        {!isMobile ? (
          <div
            className="journeys-table-wrapper"
            style={{
              overflowX: "auto",
              width: "100%",
              position: "relative",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-sm)",
              border: "1px solid var(--border-primary)",
              backgroundColor: "var(--bg-primary)",
            }}
          >
            <style>{`
              /* Set fixed column widths */
              .journeys-table-wrapper table th:first-child,
              .journeys-table-wrapper table td:first-child {
                width: 48px !important;
                min-width: 48px !important;
                max-width: 48px !important;
              }
              .journeys-table-wrapper table th:last-child,
              .journeys-table-wrapper table td:last-child {
                width: 80px !important;
                min-width: 80px !important;
                max-width: 80px !important;
              }
              /* Set 200px width for all other columns */
              .journeys-table-wrapper table th:not(:first-child):not(:last-child),
              .journeys-table-wrapper table td:not(:first-child):not(:last-child) {
                width: 200px !important;
                min-width: 200px !important;
                max-width: 200px !important;
              }
              /* Truncate text in table cells to prevent wrapping */
              .journeys-table-wrapper table td {
                max-width: 0;
              }
              /* Truncate single-line text spans */
              .journeys-table-wrapper table td span.font-medium,
              .journeys-table-wrapper table td span.font-semibold,
              .journeys-table-wrapper table td > span:not(.flex) {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
                max-width: 100%;
              }
              /* Truncate text in flex containers */
              .journeys-table-wrapper table td .flex {
                min-width: 0;
              }
              /* Truncate individual text elements in flex columns */
              .journeys-table-wrapper table td .flex.flex-col span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: block;
              }
              /* Truncate text in horizontal flex containers */
              .journeys-table-wrapper table td .flex:not(.flex-col) > span {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                min-width: 0;
              }
            `}</style>
            {tableData.length > 0 ? (
              <Table columns={columns} data={tableData} />
            ) : (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--space-8)",
                color: "var(--secondary)",
              }}>
                No data available
              </div>
            )}
          </div>
        ) : (
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
            paddingTop: "16px",
            width: "100%",
            maxWidth: "360px",
            margin: "0 auto",
          }}>
            {filteredJourneys.length > 0 ? (
              filteredJourneys.map((journey) => renderJourneyCard(journey))
            ) : (
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--space-8)",
                color: "var(--secondary)",
              }}>
                No data available
              </div>
            )}
          </div>
        )}

        {/* Floating Action Button - Mobile Only */}
        {isMobile && (
          <Button
            variant="primary"
            icon="add"
            onClick={() => {
              console.log("Add journey clicked")
            }}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "calc(50% - 24px)",
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              padding: 0,
              minWidth: "48px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
              zIndex: 1000,
              backgroundColor: "#434F64",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        )}
      </div>
    </div>
  )
}
