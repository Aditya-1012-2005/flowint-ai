import {
  Bot,
  LayoutDashboard,
  BrainCircuit,
  Table2,
  Boxes,
  ReceiptText,
  FileSpreadsheet,
  MessageCircle,
  Workflow,
  Store,
  Truck,
  UtensilsCrossed,
  Stethoscope,
  Factory,
  Briefcase,
  type LucideIcon,
} from 'lucide-react';

export type Solution = {
  icon: LucideIcon;
  title: string;
  summary: string;
  details: string[];
};

/** Shared by the Home preview and the full Solutions page. */
export const solutions: Solution[] = [
  {
    icon: Bot,
    title: 'AI agents & smart tools',
    summary:
      'Put AI agents and custom tools to work on the repetitive jobs — they do your busywork so you and your team do not have to.',
    details: [
      'AI agents that run tasks end to end, on their own',
      'Custom tools built around your exact workflow',
      'You stay in control; they do the heavy lifting',
    ],
  },
  {
    icon: LayoutDashboard,
    title: 'Live interactive dashboards',
    summary:
      'Creative, interactive dashboards that show your whole business live — sales, stock and cash, all updating in real time.',
    details: [
      'Real-time numbers, no manual refreshing',
      'Filter and drill into any metric in a click',
      'One beautiful screen instead of ten spreadsheets',
    ],
  },
  {
    icon: BrainCircuit,
    title: 'AI data analysis & insights',
    summary:
      'AI digs through your data and surfaces insights and patterns no human could spot — so you decide with facts, not guesswork.',
    details: [
      'Spots trends, spikes and anomalies automatically',
      'Finds hidden patterns across all your data',
      'Clear, plain-language insights you can act on',
    ],
  },
  {
    icon: Table2,
    title: 'Google Sheets automation',
    summary:
      'Automate the Google Sheets work you do by hand and save a lot of hours every week — with nothing new to learn.',
    details: [
      'Sheets that update, sort and calculate themselves',
      'Data flows in from bills, forms and other tools',
      'Hours of manual copy-paste gone for good',
    ],
  },
  {
    icon: Boxes,
    title: 'Inventory management automation',
    summary:
      "Know what's in stock in real time, without counting registers or updating a spreadsheet by hand.",
    details: [
      'Stock levels that update on their own as you buy and sell',
      'Smart low-stock alerts before a fast-moving item runs out',
      'One live dashboard instead of five different Excel files',
    ],
  },
  {
    icon: ReceiptText,
    title: 'GST billing & invoice automation',
    summary: 'Generate clean, GST-ready invoices in seconds and always know who still owes you.',
    details: [
      'GST-compliant invoices without the manual formatting',
      'Payment tracking so nothing slips through the cracks',
      'Automatic WhatsApp and email reminders for pending payments',
    ],
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp order automation',
    summary:
      'Turn the orders customers send on WhatsApp into a clean, trackable order list, automatically.',
    details: [
      'Orders captured from chats without copy-pasting',
      'Order status and confirmations sent back to customers',
      'Every order logged in one place, ready for billing',
    ],
  },
  {
    icon: FileSpreadsheet,
    title: 'AI data entry & document processing',
    summary:
      'Stop retyping the same numbers. AI reads bills, receipts and orders and fills your records for you.',
    details: [
      'AI extraction from bills, PDFs, photos and messages',
      'Fewer typos and mismatched entries',
      'Hours of manual typing saved every week',
    ],
  },
  {
    icon: Workflow,
    title: 'Workflow automation',
    summary:
      'Connect the tools you already use, like Excel, Google Sheets and WhatsApp, so routine tasks run themselves.',
    details: [
      'Repetitive steps handled automatically, end to end',
      'Works with your current process, nothing new to learn',
      'Grows with you as the business adds more work',
    ],
  },
];

/** Featured on the Home page (the rest live on the Solutions page). */
export const featuredSolutions = solutions.slice(0, 6);

export const howItWorks = [
  {
    step: '1',
    title: 'We learn how you work today',
    description:
      'We sit with you and look at your real setup: the Excel sheets, the registers, the WhatsApp orders, exactly as they are.',
  },
  {
    step: '2',
    title: 'We build AI automation around it',
    description:
      "We set up agents, tools and dashboards that fit the way you already work, so there's nothing new to learn.",
  },
  {
    step: '3',
    title: 'You get your time back',
    description:
      'The routine stuff runs on its own. You spend less time on data entry and more time growing the business.',
  },
];

export type Industry = {
  icon: LucideIcon;
  name: string;
  /** The everyday win this trade gets — concrete, in their own words. */
  outcome: string;
  tint: string;
};

/** Who we build for. Doubles as long-tail keyword coverage. */
export const industries: Industry[] = [
  {
    icon: Store,
    name: 'Retail & kirana stores',
    outcome: 'Live stock counts and GST bills, straight from the day’s sales.',
    tint: 'var(--brand-violet)',
  },
  {
    icon: Truck,
    name: 'Wholesalers & distributors',
    outcome: 'Order lists and pending payments that keep themselves current.',
    tint: 'var(--brand-cyan)',
  },
  {
    icon: UtensilsCrossed,
    name: 'Restaurants & cloud kitchens',
    outcome: 'Every WhatsApp and app order logged in one place, ready to bill.',
    tint: 'var(--brand-pink)',
  },
  {
    icon: Stethoscope,
    name: 'Clinics & pharmacies',
    outcome: 'Stock, expiry and billing handled without the paper registers.',
    tint: 'var(--brand-amber)',
  },
  {
    icon: Factory,
    name: 'Manufacturers & workshops',
    outcome: 'Jobs, materials and invoices tracked end to end, not in your head.',
    tint: 'var(--brand-violet)',
  },
  {
    icon: Briefcase,
    name: 'Service businesses & agencies',
    outcome: 'Client work, follow-ups and billing running quietly on their own.',
    tint: 'var(--brand-cyan)',
  },
];

/** Rendered on the Home page and emitted as FAQPage JSON-LD. */
export const faqs = [
  {
    question: 'Can AI agents and tools really do the work for me?',
    answer:
      'Yes. We set up AI agents and custom tools that handle repetitive jobs end to end — updating sheets, preparing invoices, sorting data and more — and flag anything that needs your decision. You stay in control; they do the busywork.',
  },
  {
    question: 'What is AI automation for a small business?',
    answer:
      'It means letting software handle the repetitive work you do every day, like updating stock, making invoices, typing in bill details or logging WhatsApp orders. Flowint AI sets this up around your existing process, so the work happens on its own without you learning a complicated new system.',
  },
  {
    question: 'Do I need to stop using Excel, Google Sheets or WhatsApp?',
    answer:
      'No. We start from the tools you already use, including Excel, Google Sheets, paper registers and WhatsApp, and automate around them. You keep working the way you are comfortable with.',
  },
  {
    question: 'How much does business automation cost?',
    answer:
      'Our automation is priced for small and local businesses, not large companies. The cost depends on what you want automated, so we start with a free demo, find the quickest wins, and give you a clear quote before anything is built.',
  },
  {
    question: 'How long does it take to get started?',
    answer:
      'Most businesses see their first automation running within a few weeks. We begin with the task that wastes the most time, prove the value, and grow from there.',
  },
  {
    question: 'Is my business data safe?',
    answer:
      'Yes. Your data stays yours. We only access what is needed to run your automation and we never sell or share it.',
  },
];
