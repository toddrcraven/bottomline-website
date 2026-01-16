"use client";

import { useState } from "react";
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
      "GL, AR/AP, invoicing, bank rec, recurring entries; optional fixed assets; audit-friendly controls.",
    long:
      "Native accounting with GL, AR/AP, invoicing, bank reconciliation, recurring entries, and optional fixed assets. Audit-ready controls keep close and reporting clean.",
  },
  {
    id: "sales-order",
    title: "Sales & Order Management",
    short:
      "Opportunity to quote to order, pricing rules, fulfillment, and shipment tracking.",
    long:
      "Manage the full quote-to-cash flow from opportunity and quote through sales orders, pricing rules, fulfillment, and shipment tracking.",
  },
  {
    id: "procurement",
    title: "Procurement & Purchasing",
    short: "Vendors, purchase orders, receipts, approvals, reorder points.",
    long:
      "Centralize vendor records, PO creation, approvals, receipts, and reorder points with spend visibility.",
  },
  {
    id: "inventory",
    title: "Warehouse & Inventory",
    short:
      "Multi-location/bin, barcoding, cycle counts, lot/serial, real-time COGS.",
    long:
      "Track inventory across locations and bins with barcode scanning, cycle counts, lot/serial control, and real-time COGS posting.",
  },
  {
    id: "mrp",
    title: "Production Planning (MRP/MPS)",
    short:
      "BOMs, work/production orders, demand and supply planning, visual scheduling.",
    long:
      "Plan with BOMs, work orders, MRP/MPS demand and supply planning, and simple visual scheduling.",
  },
  {
    id: "contracts",
    title: "Contract Management",
    short:
      "Approvals, obligations, renewals, milestones; link time, cost, and revenue.",
    long:
      "Track contract milestones, approvals, obligations, and renewals with links to time, cost, and revenue.",
  },
  {
    id: "loans",
    title: "Loan Management",
    short: "Amortization schedules, repayments, interest recognition, alerts.",
    long:
      "Set up loans with amortization schedules, repayment tracking, interest recognition, and alerts tied to the GL.",
  },
  {
    id: "trade",
    title: "Trade Management",
    short: "Trade programs, rebates, commissions, chargebacks, GL accruals.",
    long:
      "Manage trade programs, rebates, commissions, and chargebacks with accruals tied directly to the GL.",
  },
  {
    id: "reporting",
    title: "Reporting & Dashboards",
    short: "Operational and financial dashboards, drill-downs, exports.",
    long:
      "Use operational and financial dashboards with drill-downs and exports for decision-making.",
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
            className="bl-no-lift group flex h-full min-h-[140px] w-full flex-col justify-between rounded-xl border border-brandGreen/60 bg-surfaceMuted/70 p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brandBlue/30 hover:shadow-md hover:ring-1 hover:ring-brandBlue/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
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
