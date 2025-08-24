import {
  Home,
  Users,
  Network,
  List,
  FileText,
  Tag,
  Palette,
  Package,
  Settings,
  Puzzle,
  HelpCircle,
  ChevronRight,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  const navigationSections = [
    {
      title: "",
      items: [{ icon: Home, label: "Home", active: true }],
    },
    {
      title: "TEAM MANAGEMENT",
      items: [
        { icon: Users, label: "Members" },
        { icon: Network, label: "Departments" },
        { icon: List, label: "Bulk Adjustments" },
      ],
    },
    {
      title: "LEADS MANAGEMENT",
      items: [
        { icon: FileText, label: "Leads" },
        { icon: Tag, label: "Tags" },
      ],
    },
    {
      title: "BRAND & PRODUCTS",
      items: [
        { icon: Palette, label: "Customization" },
        { icon: Package, label: "Products" },
      ],
    },
    {
      title: "CONFIGURATION",
      items: [
        { icon: Puzzle, label: "Integrations" },
        { icon: Settings, label: "Settings" },
      ],
    },
    {
      title: "SUPPORT",
      items: [{ icon: HelpCircle, label: "FAQs" }],
    },
  ]

  return (
    <div className="w-64 bg-white border-r border-[#ebebeb] h-screen flex flex-col">
      {/* Logo Section */}
      <div className="p-4 border-b border-[#ebebeb]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#7d52f4] flex items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-white relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-1 w-1 bg-white rounded-full"></div>
              </div>
              {/* Radiating lines */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-0.5 w-1 bg-white"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 50%",
                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(6px)`,
                  }}
                />
              ))}
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-[#a3a3a3] ml-auto" />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {navigationSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="py-2">
            {section.title && (
              <div className="px-4 py-2">
                <h3 className="text-[#a3a3a3] text-xs font-medium uppercase tracking-wider">{section.title}</h3>
              </div>
            )}
            {section.items.map((item, itemIndex) => (
              <button
                key={itemIndex}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#f7f7f7] transition-colors ${
                  item.active ? "bg-[#efebff] text-[#7d52f4] border-r-2 border-[#7d52f4]" : "text-[#171717]"
                }`}
              >
                <item.icon className={`h-5 w-5 ${item.active ? "text-[#7d52f4]" : "text-[#676767]"}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Onboarding Card */}
      <div className="p-4 border-t border-[#ebebeb]">
        <div className="bg-[#f7f7f7] rounded-lg p-4 relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0 text-[#a3a3a3] hover:text-[#171717]"
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/professional-headshot.png" />
              <AvatarFallback className="text-xs">EC</AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 -ml-1">
              <AvatarImage src="/professional-woman-headshot.png" />
              <AvatarFallback className="text-xs">HY</AvatarFallback>
            </Avatar>
            <Avatar className="h-6 w-6 -ml-1">
              <AvatarImage src="/professional-headshot.png" />
              <AvatarFallback className="text-xs">DV</AvatarFallback>
            </Avatar>
            <div className="h-6 w-6 -ml-1 rounded-full bg-[#e1e4ea] flex items-center justify-center">
              <span className="text-xs text-[#676767] font-medium">+4</span>
            </div>
          </div>

          <h4 className="text-[#171717] font-semibold text-sm mb-1">Onboard your team members</h4>
          <div className="h-1 bg-[#e1e4ea] rounded-full mb-2">
            <div className="h-1 bg-[#1fc16b] rounded-full w-1/3"></div>
          </div>
          <p className="text-[#676767] text-xs mb-3">Upload your team via CSV</p>

          <Button
            variant="ghost"
            className="w-full justify-between text-[#171717] font-medium text-sm p-0 h-auto hover:bg-transparent"
          >
            Onboard your team
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-[#ebebeb]">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/professional-woman-headshot.png" />
            <AvatarFallback>SW</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-[#171717] font-semibold text-sm truncate">Sophia Williams</h4>
              <div className="h-4 w-4 rounded-full bg-[#47c2ff] flex items-center justify-center flex-shrink-0">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
            </div>
            <p className="text-[#676767] text-xs truncate">sophia@alignui.com</p>
          </div>
          <ChevronRight className="h-4 w-4 text-[#a3a3a3] flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
