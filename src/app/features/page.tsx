"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Modal from "@/components/Modal";

type Feature = {
  id: string;
  title: string;
  short: string;
  long: string;
};

const modules: Feature[] = [
  {
    id: "accounting",
    title: "Accounting",
    short:
      "The Accounting app is the financial core of BottomLine, providing real-time visibility into the general ledger and all supporting subledgers.",
    long:
      "The Accounting app is the financial core of BottomLine, providing real-time visibility into the general ledger and all supporting subledgers. It supports day-to-day accounting operations while ensuring downstream transactions from inventory, purchasing, sales, and fixed assets are automatically reflected in the books.\n\nKey capabilities include bank reconciliation with automated matching and variance tracking, flexible journal entry management for adjustments and accruals, and a fully configurable chart of accounts. BottomLine’s budgeting functionality allows budgets to be defined by account, period, and multiple dimensions, enabling detailed financial planning and variance analysis. Together, these capabilities ensure accurate financial reporting, strong internal controls, and audit-ready accounting.",
  },
  {
    id: "fixed-assets",
    title: "Fixed Assets",
    short:
      "The Fixed Assets app manages the full lifecycle of capital assets from acquisition through depreciation and eventual disposition.",
    long:
      "The Fixed Assets app manages the full lifecycle of capital assets from acquisition through depreciation and eventual disposition. Assets can be created directly or automatically from purchasing and accounts payable transactions, ensuring consistency between operational activity and accounting records.\n\nBottomLine supports multiple depreciation methods and schedules, with depreciation posted automatically to the general ledger. Asset reclassifications, impairments, and disposals are handled with full auditability, including automated gain or loss calculations. Fixed asset balances are maintained in real time, enabling accurate reporting, compliance, and alignment with financial statements.",
  },
  {
    id: "sales-trade-management",
    title: "Sales & Trade Management",
    short:
      "The Sales & Trade Management app supports order-driven revenue processes and complex trade and promotional programs.",
    long:
      "The Sales & Trade Management app supports order-driven revenue processes and complex trade and promotional programs. It manages sales orders from entry through fulfillment, ensuring accurate pricing, availability checks, and downstream execution.\n\nOrder fulfillment is tightly integrated with warehouse operations, inventory, and invoicing to provide real-time visibility into order status and financial impact. Promotional and trade programs can be configured to support discounts, rebates, and incentives, with automated accruals and settlement. This ensures that revenue, trade spend, and margins are tracked accurately across customers, products, and programs.",
  },
  {
    id: "procurement",
    title: "Procurement",
    short:
      "The Procurement app manages purchasing activities from purchase order creation through receipt and financial posting.",
    long:
      "The Procurement app manages purchasing activities from purchase order creation through receipt and financial posting. Purchase orders can be created manually or generated from planning outputs such as material requirements, ensuring alignment between demand and supply.\n\nReceipts update inventory and accruals in real time, providing immediate visibility into received quantities, costs, and liabilities. Procurement is fully integrated with accounting, inventory, and vendor management, enabling accurate three-way matching, cost control, and supplier performance tracking.",
  },
  {
    id: "warehouse",
    title: "Warehouse",
    short:
      "The Warehouse app provides comprehensive inventory and warehouse management capabilities.",
    long:
      "The Warehouse app provides comprehensive inventory and warehouse management capabilities. It supports real-time tracking of inventory across warehouses, locations, bins, and lots, ensuring accurate on-hand, available, and reserved quantities.\n\nCore processes include inventory transfers, picking, put-aways, and lot tracking for traceability and compliance. Warehouse transactions automatically generate inventory and accounting entries, maintaining alignment between physical movement and financial valuation. This enables operational efficiency while preserving inventory accuracy and audit integrity.",
  },
  {
    id: "planning-production",
    title: "Planning & Production",
    short:
      "The Planning & Production app drives demand and supply planning across the organization.",
    long:
      "The Planning & Production app drives demand and supply planning across the organization. Forecasts capture anticipated demand, which feeds production plans and master production schedules (MPS) for finished goods and subassemblies.\n\nMaterial resource planning (MRP) translates production plans into detailed material and capacity requirements, identifying shortages and constraints. Work orders manage execution on the shop floor, tracking consumption, production, and variances. This end-to-end planning and execution framework ensures that production decisions are data-driven, coordinated, and financially visible.",
  },
  {
    id: "financial-hub",
    title: "Financial Hub",
    short:
      "The Financial Hub app centralizes financial oversight and period-end activities.",
    long:
      "The Financial Hub app centralizes financial oversight and period-end activities. It provides access to core financial statements, including income statements, balance sheets, and cash flow reports, with the ability to analyze results across multiple dimensions.\n\nIn addition, the Financial Hub supports operational finance functions such as check printing and structured period closing. Period close tools help coordinate and control posting activities, ensure completeness, and maintain auditability. This app serves as the command center for financial performance and governance.",
  },
  {
    id: "bottomline-administration",
    title: "BottomLine Administration",
    short:
      "The BottomLine Administration app provides the configuration and control layer that powers the entire ERP.",
    long:
      "The BottomLine Administration app provides the configuration and control layer that powers the entire ERP. It enables administrators and finance leaders to define accounting setups, warehouse configurations, and document templates that drive consistent behavior across transactions.\n\nAdministrative settings control how accounting, purchasing, sales, inventory, and planning processes behave, including transaction types, posting rules, dimensions, and automation logic. Because BottomLine is setup-driven, these configurations reduce manual entry, enforce business rules, and ensure scalability as the organization grows.",
  },
];

const differentiators: Feature[] = [
  {
    id: "native-modular",
    title: "Salesforce-Native & Modular",
    short: "Built on Salesforce; deploy modules as needed.",
    long:
      "BottomLine runs natively on Salesforce with a modular footprint so teams can start small and expand without re-platforming.",
  },
  {
    id: "native-accounting",
    title: "Native Accounting",
    short: "No external accounting sync.",
    long:
      "Accounting lives in the same data model as ops, eliminating fragile integrations and reconciliation delays.",
  },
  {
    id: "loan-management",
    title: "Built-In Loan Management",
    short: "Loan schedules and interest built in.",
    long:
      "Native loan management handles schedules, repayments, and interest recognition without bolt-ons.",
  },
  {
    id: "quote-to-cash",
    title: "True Quote-to-Cash",
    short: "Sales to fulfillment to invoicing on one platform.",
    long:
      "Keep pricing, inventory, fulfillment, and invoicing tightly linked for accurate margins.",
  },
  {
    id: "smb-ux",
    title: "SMB-Friendly UX",
    short: "Streamlined flows and lighter MRP.",
    long:
      "Opinionated workflows reduce clicks for small teams while keeping depth where it counts.",
  },
  {
    id: "mobile-warehouse",
    title: "Mobile Warehouse & Barcoding",
    short: "Scanner-ready, mobile-first warehouse.",
    long:
      "Barcode-enabled receiving, picking, and cycle counts keep inventory current in real time.",
  },
  {
    id: "gl-linkage",
    title: "Tight GL Linkage",
    short: "Ops post cleanly to the books.",
    long:
      "Inventory, production, and trade transactions post directly to the right accounts.",
  },
  {
    id: "deployment",
    title: "Low-Friction Deployment",
    short: "Fast start with sensible defaults.",
    long:
      "Preconfigured templates and guidance accelerate go-live with room to tailor later.",
  },
];

const capabilities: Feature[] = [
  {
    id: "roles",
    title: "Roles, Permissions & Audit Trails",
    short: "Job-based access and traceability.",
    long:
      "Define role-based access with audit trails for approvals and financial controls.",
  },
  {
    id: "workflow",
    title: "Workflow Automation & Approvals",
    short: "Automate multi-step processes.",
    long:
      "Use approvals and workflows for consistent purchasing, sales, and inventory controls.",
  },
  {
    id: "extensibility",
    title: "Data Model Extensibility",
    short: "Extend objects and fields safely.",
    long:
      "Customize fields, objects, and logic without losing upgrade paths.",
  },
  {
    id: "analytics",
    title: "Dashboards & Analytics",
    short: "KPIs across finance and ops.",
    long:
      "Standard dashboards plus ad-hoc reporting for executives and operators.",
  },
  {
    id: "migration",
    title: "Data Migration & Imports",
    short: "Templates and guided imports.",
    long:
      "Import master data and balances with utilities designed for SMB onboarding.",
  },
];

const roadmap: Feature[] = [
  {
    id: "capacity-planning",
    title: "Advanced Capacity Planning",
    short: "Deeper shop-floor planning.",
    long:
      "Add routings, calendars, and finite scheduling for higher-complexity manufacturers.",
  },
  {
    id: "multi-entity",
    title: "Multi-Entity Accounting",
    short: "Consolidations and eliminations.",
    long:
      "Roll up reporting and period close across entities with intercompany support.",
  },
  {
    id: "cpq-lite",
    title: "CPQ-Lite",
    short: "Richer quoting experience.",
    long:
      "Guided selling and configurable pricing rules integrated with customer items.",
  },
  {
    id: "costing",
    title: "Deeper Costing",
    short: "Landed cost allocations.",
    long:
      "Allocate freight and duty while refining cost layers for better margin accuracy.",
  },
  {
    id: "forecasting",
    title: "Forecasting & Anomaly Detection",
    short: "AI-assisted planning signals.",
    long:
      "Predict demand and surface exceptions to enable proactive decisions.",
  },
  {
    id: "appexchange",
    title: "AppExchange Packaging",
    short: "Installer and listing.",
    long:
      "Package modules for easier installs and marketplace distribution.",
  },
];

const otherFeatures: Feature[] = [...capabilities, ...roadmap];

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
            <div>
              <p className="text-lg font-semibold text-white">
                {feature.title}
              </p>
              <p className="mt-2 text-sm text-brandSlate/90">
                {feature.short}
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-2 rounded-md bg-brandBlue/10 px-3 py-2 text-xs font-medium text-brandBlue ring-1 ring-inset ring-brandBlue/25 transition-colors hover:bg-brandBlue/20 hover:text-white hover:ring-brandBlue/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandBlue/60">
              View details
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  const [selected, setSelected] = useState<Feature | null>(null);
  const searchParams = useSearchParams();

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
        title="Apps (Modules)"
        items={modules}
        onOpen={setSelected}
      />
      <FeatureSection
        title="Differentiators"
        items={differentiators}
        onOpen={setSelected}
      />
      <FeatureSection
        title="Other Features"
        items={otherFeatures}
        onOpen={setSelected}
      />

      <Modal
        open={Boolean(selected)}
        title={selected?.title ?? ""}
        onClose={() => setSelected(null)}
      >
        <div className="space-y-3">
          <p>{selected?.long}</p>
        </div>
      </Modal>
    </main>
  );
}
