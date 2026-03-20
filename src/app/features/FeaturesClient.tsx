"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Modal from "@/components/Modal";

type Feature = {
  id: string;
  title: string;
  short: string;
  long: string;
  detailSections?: [string, string, string, string];
};

const modules: Feature[] = [
  {
    id: "accounting",
    title: "Accounting",
    short:
      "The Accounting app is the financial core of BottomLine, providing real-time visibility into the general ledger and all supporting subledgers.",
    long:
      "The Accounting app is the financial core of BottomLine, providing real-time visibility into the general ledger and all supporting subledgers. It supports day-to-day accounting operations while ensuring downstream transactions from inventory, purchasing, sales, and fixed assets are automatically reflected in the books.\n\nKey capabilities include bank reconciliation with automated matching and variance tracking, flexible journal entry management for adjustments and accruals, and a fully configurable chart of accounts. BottomLine’s budgeting functionality allows budgets to be defined by account, period, and multiple dimensions, enabling detailed financial planning and variance analysis. Together, these capabilities ensure accurate financial reporting, strong internal controls, and audit-ready accounting.",
    detailSections: [
      "The Accounting app is the financial core of BottomLine, providing real-time visibility into the general ledger and all supporting subledgers.",
      "It supports day-to-day accounting operations while ensuring downstream transactions from inventory, purchasing, sales, and fixed assets are automatically reflected in the books.",
      "Key capabilities include bank reconciliation with automated matching and variance tracking, flexible journal entry management for adjustments and accruals, and a fully configurable chart of accounts.",
      "BottomLine’s budgeting functionality allows budgets to be defined by account, period, and multiple dimensions, enabling detailed financial planning and variance analysis. Together, these capabilities ensure accurate financial reporting, strong internal controls, and audit-ready accounting.",
    ],
  },
  {
    id: "fixed-assets",
    title: "Fixed Assets",
    short:
      "The Fixed Assets app manages the full lifecycle of capital assets from acquisition through depreciation and eventual disposition.",
    long:
      "The Fixed Assets app manages the full lifecycle of capital assets from acquisition through depreciation and eventual disposition. Assets can be created directly or automatically from purchasing and accounts payable transactions, ensuring consistency between operational activity and accounting records.\n\nBottomLine supports multiple depreciation methods and schedules, with depreciation posted automatically to the general ledger. Asset reclassifications, impairments, and disposals are handled with full auditability, including automated gain or loss calculations. Fixed asset balances are maintained in real time, enabling accurate reporting, compliance, and alignment with financial statements.",
    detailSections: [
      "The Fixed Assets app manages the full lifecycle of capital assets from acquisition through depreciation and eventual disposition.",
      "Assets can be created directly or automatically from purchasing and accounts payable transactions, ensuring consistency between operational activity and accounting records.",
      "BottomLine supports multiple depreciation methods and schedules, with depreciation posted automatically to the general ledger. Asset reclassifications, impairments, and disposals are handled with full auditability, including automated gain or loss calculations.",
      "Fixed asset balances are maintained in real time, enabling accurate reporting, compliance, and alignment with financial statements.",
    ],
  },
  {
    id: "sales-trade-management",
    title: "Sales & Trade Management",
    short:
      "The Sales & Trade Management app supports order-driven revenue processes and complex trade and promotional programs.",
    long:
      "The Sales & Trade Management app supports order-driven revenue processes and complex trade and promotional programs. It manages sales orders from entry through fulfillment, ensuring accurate pricing, availability checks, and downstream execution.\n\nOrder fulfillment is tightly integrated with warehouse operations, inventory, and invoicing to provide real-time visibility into order status and financial impact. Promotional and trade programs can be configured to support discounts, rebates, and incentives, with automated accruals and settlement. This ensures that revenue, trade spend, and margins are tracked accurately across customers, products, and programs.",
    detailSections: [
      "The Sales & Trade Management app supports order-driven revenue processes and complex trade and promotional programs.",
      "It manages sales orders from entry through fulfillment, ensuring accurate pricing, availability checks, and downstream execution.",
      "Order fulfillment is tightly integrated with warehouse operations, inventory, and invoicing to provide real-time visibility into order status and financial impact.",
      "Promotional and trade programs can be configured to support discounts, rebates, and incentives, with automated accruals and settlement. This ensures that revenue, trade spend, and margins are tracked accurately across customers, products, and programs.",
    ],
  },
  {
    id: "procurement",
    title: "Procurement",
    short:
      "The Procurement app manages purchasing activities from purchase order creation through receipt and financial posting.",
    long:
      "The Procurement app manages purchasing activities from purchase order creation through receipt and financial posting. Purchase orders can be created manually or generated from planning outputs such as material requirements, ensuring alignment between demand and supply.\n\nReceipts update inventory and accruals in real time, providing immediate visibility into received quantities, costs, and liabilities. Procurement is fully integrated with accounting, inventory, and vendor management, enabling accurate three-way matching, cost control, and supplier performance tracking.",
    detailSections: [
      "The Procurement app manages purchasing activities from purchase order creation through receipt and financial posting.",
      "Purchase orders can be created manually or generated from planning outputs such as material requirements, ensuring alignment between demand and supply.",
      "Receipts update inventory and accruals in real time, providing immediate visibility into received quantities, costs, and liabilities.",
      "Procurement is fully integrated with accounting, inventory, and vendor management, enabling accurate three-way matching, cost control, and supplier performance tracking.",
    ],
  },
  {
    id: "warehouse",
    title: "Warehouse",
    short:
      "The Warehouse app provides comprehensive inventory and warehouse management capabilities.",
    long:
      "The Warehouse app provides comprehensive inventory and warehouse management capabilities. It supports real-time tracking of inventory across warehouses, locations, bins, and lots, ensuring accurate on-hand, available, and reserved quantities.\n\nCore processes include inventory transfers, picking, put-aways, and lot tracking for traceability and compliance. Warehouse transactions automatically generate inventory and accounting entries, maintaining alignment between physical movement and financial valuation. This enables operational efficiency while preserving inventory accuracy and audit integrity.",
    detailSections: [
      "The Warehouse app provides comprehensive inventory and warehouse management capabilities.",
      "It supports real-time tracking of inventory across warehouses, locations, bins, and lots, ensuring accurate on-hand, available, and reserved quantities.",
      "Core processes include inventory transfers, picking, put-aways, and lot tracking for traceability and compliance. Warehouse transactions automatically generate inventory and accounting entries, maintaining alignment between physical movement and financial valuation.",
      "This enables operational efficiency while preserving inventory accuracy and audit integrity.",
    ],
  },
  {
    id: "planning-production",
    title: "Planning & Production",
    short:
      "The Planning & Production app drives demand and supply planning across the organization.",
    long:
      "The Planning & Production app drives demand and supply planning across the organization. Forecasts capture anticipated demand, which feeds production plans and master production schedules (MPS) for finished goods and subassemblies.\n\nMaterial resource planning (MRP) translates production plans into detailed material and capacity requirements, identifying shortages and constraints. Work orders manage execution on the shop floor, tracking consumption, production, and variances. This end-to-end planning and execution framework ensures that production decisions are data-driven, coordinated, and financially visible.",
    detailSections: [
      "The Planning & Production app drives demand and supply planning across the organization.",
      "Forecasts capture anticipated demand, which feeds production plans and master production schedules (MPS) for finished goods and subassemblies.",
      "Material resource planning (MRP) translates production plans into detailed material and capacity requirements, identifying shortages and constraints.",
      "Work orders manage execution on the shop floor, tracking consumption, production, and variances.",
    ],
  },
  {
    id: "financial-hub",
    title: "Financial Hub",
    short:
      "The Financial Hub app centralizes financial oversight and period-end activities.",
    long:
      "The Financial Hub app centralizes financial oversight and period-end activities. It provides access to core financial statements, including income statements, balance sheets, and cash flow reports, with the ability to analyze results across multiple dimensions.\n\nIn addition, the Financial Hub supports operational finance functions such as check printing and structured period closing. Period close tools help coordinate and control posting activities, ensure completeness, and maintain auditability. This app serves as the command center for financial performance and governance.",
    detailSections: [
      "The Financial Hub app centralizes financial oversight and period-end activities.",
      "It provides access to core financial statements, including income statements, balance sheets, and cash flow reports, with the ability to analyze results across multiple dimensions.",
      "The Financial Hub supports operational finance functions such as check printing.",
      "Structured period closing ensures coordinated posting activities, completeness, and auditability.",
    ],
  },
  {
    id: "bottomline-administration",
    title: "BottomLine Administration",
    short:
      "The BottomLine Administration app provides the configuration and control layer that powers the entire ERP.",
    long:
      "The BottomLine Administration app provides the configuration and control layer that powers the entire ERP. It enables administrators and finance leaders to define accounting setups, warehouse configurations, and document templates that drive consistent behavior across transactions.\n\nAdministrative settings control how accounting, purchasing, sales, inventory, and planning processes behave, including transaction types, posting rules, dimensions, and automation logic. Because BottomLine is setup-driven, these configurations reduce manual entry, enforce business rules, and ensure scalability as the organization grows.",
    detailSections: [
      "The BottomLine Administration app provides the configuration and control layer that powers the entire ERP.",
      "It enables administrators and finance leaders to define accounting setups and warehouse configurations that drive consistent behavior across transactions.",
      "Administrative settings control how accounting, purchasing, sales, inventory, and planning processes behave, including transaction types, posting rules, dimensions, and automation logic.",
      "Document templates standardize transactional output and keep communications consistent across teams.",
    ],
  },
];

type SectionProps = {
  title: string;
  items: Feature[];
  onOpen: (feature: Feature) => void;
};

function FeatureSection({ title, items, onOpen }: SectionProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-4 text-xl font-semibold text-white">
        <span className="bl-underlined">{title}</span>
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((feature) => (
          <button
            key={feature.id}
            type="button"
            onClick={() => onOpen(feature)}
            aria-haspopup="dialog"
            className="bl-card-pretty bl-no-lift group flex h-full min-h-[140px] w-full flex-col justify-between rounded-xl border border-brandGreen/60 bg-surfaceMuted/70 p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brandBlue/30 hover:shadow-md hover:ring-1 hover:ring-brandBlue/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
          >
            <div className="mb-3 rounded-md border-2 border-dashed border-border/60 bg-surface-header/40 p-3">
              <div className="flex h-24 w-full items-center justify-center text-xs text-brandSlate">
                Screenshot
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-[color:var(--header-banner-bg)]">
                {feature.title}
              </p>
              <p className="mt-2 text-sm text-[color:var(--header-banner-bg)]">
                {feature.short}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-2 rounded-md bg-brandBlue/10 px-3 py-2 text-xs font-medium text-[color:var(--header-banner-bg)] ring-1 ring-inset ring-brandBlue/25 transition-colors hover:bg-brandBlue/20 hover:text-[color:var(--header-banner-bg)] hover:ring-brandBlue/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue/60">
              View details
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function FeaturesClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<Feature | null>(null);
  const searchParams = useSearchParams();
  const returnKey = "moduleDetailReturn";

  useEffect(() => {
    const moduleId = searchParams.get("module");
    if (!moduleId) {
      return;
    }

    const match = modules.find((module) => module.id === moduleId);
    if (match) {
      setSelected(match);
    }
  }, [searchParams]);

  const storeReturnPosition = () => {
    try {
      window.sessionStorage.setItem(
        returnKey,
        JSON.stringify({
          path: pathname,
          search: window.location.search,
          scrollY: window.scrollY,
        })
      );
    } catch {}
  };

  const handleOpen = (feature: Feature) => {
    storeReturnPosition();
    setSelected(feature);
  };

  type ReturnPosition = { path?: string; search?: string; scrollY?: number };

  const handleClose = () => {
    let data: ReturnPosition | null = null;
    try {
      const raw = window.sessionStorage.getItem(returnKey);
      data = raw ? (JSON.parse(raw) as ReturnPosition) : null;
    } catch {
      data = null;
    }

    setSelected(null);

    if (data?.path && data.path !== pathname) {
      router.push(`${data.path}${data.search ?? ""}`, { scroll: false });
      return;
    }

    if (data?.path === pathname) {
      if (typeof data.scrollY === "number") {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: data.scrollY, behavior: "auto" });
        });
      }
      window.sessionStorage.removeItem(returnKey);
      return;
    }

    if (searchParams.get("module")) {
      router.replace(pathname, { scroll: false });
    }
  };

  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold text-white">
          <span className="bl-underlined">Features</span>
        </h1>
        <p className="mt-3 max-w-3xl text-brandSlate">
          Explore BottomLine ERP modules and platform capabilities. Select any
          item to open details.
        </p>
      </header>

      <FeatureSection
        title="Modules"
        items={modules}
        onOpen={handleOpen}
      />

      <Modal
        open={Boolean(selected)}
        title={selected?.title ?? ""}
        onClose={handleClose}
        containerClassName="max-w-none w-[90vw] h-[85vh] flex flex-col"
        bodyClassName="max-h-none flex-1"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {(selected?.detailSections ?? []).map((section, index) => (
            <div key={`${selected?.id ?? "module"}-${index}`} className="space-y-3">
              <div className="rounded-md border-2 border-dashed border-border/60 bg-surface-header/40 p-3">
                <div className="flex h-24 w-full items-center justify-center text-xs text-brandSlate">
                  Screenshot
                </div>
              </div>
              <p className="text-sm text-brandSlate">{section}</p>
            </div>
          ))}
        </div>
      </Modal>
    </main>
  );
}
