"use client"

import { useEffect } from "react"
import { Bell, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/sidebar"
import SearchFilter from "@/components/search-filter"
import { useLeadsStore } from "@/lib/store"

export default function LeadsDashboard() {
  const { filteredLeads, isLoading, error, fetchLeads } = useLeadsStore()

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  if (error) {
    return (
      <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#171717] mb-2">Error loading leads</h2>
          <p className="text-[#7b7b7b] mb-4">{error}</p>
          <Button onClick={fetchLeads}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-[#ebebeb] px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/professional-woman-headshot.png" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-[#171717] font-semibold text-lg">Sophia Williams</h1>
                <p className="text-[#7b7b7b] text-sm">Welcome back to Synergy 👋</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Bell className="h-5 w-5 text-[#7b7b7b]" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-[#ebebeb] px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex overflow-x-auto">
              <button className="px-4 py-3 text-[#171717] font-medium border-b-2 border-[#171717] whitespace-nowrap">
                Leads
              </button>
              <button className="px-4 py-3 text-[#7b7b7b] font-medium whitespace-nowrap">Lead Quality Score</button>
              <button className="px-4 py-3 text-[#7b7b7b] font-medium whitespace-nowrap">Leaderboard</button>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-[#7b7b7b] border-[#d1d1d1] bg-transparent"
              >
                Export
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-4 md:p-6">
          <SearchFilter />
        </div>

        {/* Table */}
        <div className="px-4 md:px-6 pb-6">
          <div className="bg-white rounded-lg border border-[#ebebeb] overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7d52f4] mx-auto mb-4"></div>
                <p className="text-[#7b7b7b]">Loading leads...</p>
              </div>
            ) : (
              <>
                {/* Desktop Table Header */}
                <div className="hidden md:grid md:grid-cols-5 gap-4 px-6 py-4 bg-[#f7f7f7] border-b border-[#ebebeb]">
                  <div className="text-[#7b7b7b] text-sm font-medium">Lead</div>
                  <div className="text-[#7b7b7b] text-sm font-medium">Tags</div>
                  <div className="text-[#7b7b7b] text-sm font-medium">Connected with</div>
                  <div className="text-[#7b7b7b] text-sm font-medium">Date</div>
                  <div className="text-[#7b7b7b] text-sm font-medium">Export</div>
                </div>

                {/* Table Rows */}
                {filteredLeads.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-[#7b7b7b]">No leads found matching your criteria.</p>
                  </div>
                ) : (
                  filteredLeads.map((lead, index) => (
                    <div
                      key={lead.id}
                      className={`px-4 md:px-6 py-4 ${index !== filteredLeads.length - 1 ? "border-b border-[#ebebeb]" : ""}`}
                    >
                      {/* Mobile Layout */}
                      <div className="md:hidden space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-[#ffc0c5] flex items-center justify-center">
                            <span className="text-[#681219] font-medium text-sm">
                              {lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="text-[#171717] font-medium text-sm">{lead.name}</div>
                            <div className="text-[#7b7b7b] text-sm">{lead.email}</div>
                          </div>
                        </div>

                        {lead.tags.length > 0 && (
                          <div className="flex items-center gap-2 flex-wrap">
                            {lead.tags.map((tag, tagIndex) => (
                              <div key={tagIndex} className="flex items-center gap-1">
                                <Badge
                                  style={{ backgroundColor: tag.color, color: "white" }}
                                  className="text-xs font-medium px-2 py-1"
                                >
                                  {tag.name}
                                </Badge>
                                <span className="text-[#7b7b7b] text-sm">+{tag.count}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="text-[#7b7b7b] text-sm">{lead.date.replace("\n", " ")}</div>
                          <div className="flex items-center gap-2">
                            {lead.hasExport && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-[#7b7b7b] border-[#d1d1d1] bg-transparent"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                            {lead.hasIntegration && (
                              <div className="flex items-center">
                                <div className="h-6 w-6 rounded bg-[#ff4a00] flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">*</span>
                                </div>
                                <div className="h-6 w-6 rounded bg-[#00ca72] flex items-center justify-center ml-1">
                                  <span className="text-white text-xs">P</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden md:grid md:grid-cols-5 gap-4 items-center">
                        {/* Lead */}
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-[#ffc0c5] flex items-center justify-center">
                            <span className="text-[#681219] font-medium text-sm">
                              {lead.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <div className="text-[#171717] font-medium text-sm">{lead.name}</div>
                            <div className="text-[#7b7b7b] text-sm">{lead.email}</div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex items-center gap-2">
                          {lead.tags.length > 0 ? (
                            lead.tags.map((tag, tagIndex) => (
                              <div key={tagIndex} className="flex items-center gap-1">
                                <Badge
                                  style={{ backgroundColor: tag.color, color: "white" }}
                                  className="text-xs font-medium px-2 py-1"
                                >
                                  {tag.name}
                                </Badge>
                                <span className="text-[#7b7b7b] text-sm">+{tag.count}</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-[#7b7b7b] text-sm">No tags added</span>
                          )}
                        </div>

                        {/* Connected with */}
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={lead.connectedWith.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {lead.connectedWith.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-[#171717] font-medium text-sm">{lead.connectedWith.name}</div>
                            <div className="text-[#7b7b7b] text-sm">{lead.connectedWith.email}</div>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="text-[#171717] text-sm whitespace-pre-line">{lead.date}</div>

                        {/* Export */}
                        <div className="flex items-center gap-2">
                          {lead.hasExport && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#7b7b7b] border-[#d1d1d1] bg-transparent"
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Export
                            </Button>
                          )}
                          {lead.hasIntegration && (
                            <div className="flex items-center">
                              <div className="h-6 w-6 rounded bg-[#ff4a00] flex items-center justify-center">
                                <span className="text-white text-xs font-bold">*</span>
                              </div>
                              <div className="h-6 w-6 rounded bg-[#00ca72] flex items-center justify-center ml-1">
                                <span className="text-white text-xs">P</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
