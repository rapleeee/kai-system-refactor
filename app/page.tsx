"use client";

import React from "react";

import { Badge, type BadgeVariant } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

interface Asset {
  id: string;
  name: string;
  type: string;
  depot: string;
  ageYears: number;
  economicLife: number;
  canBeRejuvenated: boolean;
  healthStatus: "stabil" | "warning" | "critical" | "improving";
  nextAction: string;
  lastMaintenance: string;
  costProjection: number; // in billion rupiah
  availability: number; // 0 - 1
  notes: string;
}

const fleetAssets: Asset[] = [
  {
    id: "CC2019216",
    name: "CC2019216",
    type: "Lokomotif",
    depot: "Lokomotif",
    ageYears: 39,
    economicLife: 30,
    canBeRejuvenated: false,
    healthStatus: "critical",
    nextAction: "Penggantian Unit Baru",
    lastMaintenance: "2024-05-12",
    costProjection: 23,
    availability: 0.63,
    notes: "Melebihi umur ekonomis, bogie dan mesin utama riskan.",
  },
  {
    id: "CC2019217",
    name: "CC2019217",
    type: "Lokomotif",
    depot: "Lokomotif",
    ageYears: 39,
    economicLife: 30,
    canBeRejuvenated: true,
    healthStatus: "critical",
    nextAction: "Repowering",
    lastMaintenance: "2024-04-28",
    costProjection: 15,
    availability: 0.66,
    notes: "Perlu repowering untuk menjaga keandalan traksi.",
  },
  {
    id: "K319603",
    name: "K319603",
    type: "KRL",
    depot: "Depo Bukit Duri",
    ageYears: 40,
    economicLife: 30,
    canBeRejuvenated: true,
    healthStatus: "critical",
    nextAction: "Retrofit",
    lastMaintenance: "2024-02-18",
    costProjection: 5,
    availability: 0.72,
    notes: "Butuh retrofit sistem propulsi dan HVAC.",
  },
  {
    id: "K102325",
    name: "K102325",
    type: "Kereta Penumpang",
    depot: "Balai Yasa Surabaya",
    ageYears: 2,
    economicLife: 30,
    canBeRejuvenated: true,
    healthStatus: "stabil",
    nextAction: "Perawatan Rutin",
    lastMaintenance: "2024-05-30",
    costProjection: 2,
    availability: 0.97,
    notes: "Performa stabil, lanjutkan perawatan terjadwal.",
  },
  {
    id: "GB258323",
    name: "GB258323",
    type: "Gerbong Barang",
    depot: "Balai Yasa Tegal",
    ageYears: 34,
    economicLife: 30,
    canBeRejuvenated: false,
    healthStatus: "critical",
    nextAction: "Penggantian Unit Baru",
    lastMaintenance: "2023-12-10",
    costProjection: 18,
    availability: 0.54,
    notes: "Struktur utama korosi berat, tidak ekonomis diremajakan.",
  },
  {
    id: "K100802",
    name: "K100802",
    type: "Kereta Penumpang",
    depot: "Depo Bukit Duri",
    ageYears: 16,
    economicLife: 30,
    canBeRejuvenated: true,
    healthStatus: "warning",
    nextAction: "Midlife Overhaul",
    lastMaintenance: "2024-03-22",
    costProjection: 10,
    availability: 0.81,
    notes: "Perlu monitor rangka dan interior, jadwalkan midlife overhaul.",
  },
];

const sidebarSections = [
  {
    title: "Menu Utama",
    items: [
      { label: "Dashboard Utama", active: true },
      { label: "Asset Register", active: false },
      { label: "Health Analytics", active: false },
    ],
  },
  {
    title: "Management",
    items: [
      { label: "Reminder Perawatan", active: false },
      { label: "Perencanaan Capex", active: false },
      { label: "Ketersediaan Depo", active: false },
      { label: "Program Rejuvenasi", active: false },
    ],
  },
  {
    title: "Setting",
    items: [
      { label: "Laporan & Insight", active: false },
      { label: "Pengaturan Tim", active: false },
    ],
  },
];

const capexPlan = [
  { label: "Jan", value: 22 },
  { label: "Mar", value: 38 },
  { label: "Mei", value: 28 },
  { label: "Jul", value: 44 },
  { label: "Sep", value: 32 },
  { label: "Nov", value: 54 },
];

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const formatBillion = (value: number) => `Rp ${rupiahFormatter.format(value)} M`;

const assetStatusMap = {
  stabil: { label: "Stabil", variant: "success" as const },
  warning: { label: "Perlu Monitor", variant: "warning" as const },
  critical: { label: "Kritis", variant: "critical" as const },
  improving: { label: "Pemulihan", variant: "default" as const },
};

const summary = {
  totalAssets: fleetAssets.length,
  rejuvenationNeeded: fleetAssets.filter(
    (asset) => asset.canBeRejuvenated && asset.ageYears >= asset.economicLife - 2,
  ).length,
  replacementNeeded: fleetAssets.filter(
    (asset) => !asset.canBeRejuvenated && asset.ageYears >= asset.economicLife - 1,
  ).length,
  protectedValue: fleetAssets
    .filter((asset) => asset.canBeRejuvenated)
    .reduce((total, asset) => total + asset.costProjection, 0),
  availability: Math.round(
    (fleetAssets.reduce((total, asset) => total + asset.availability, 0) / fleetAssets.length) * 100,
  ),
};

const ageGroups = [
  { label: "1 - 15 Tahun", count: 3248 },
  { label: "16 - 25 Tahun", count: 1886 },
  { label: "25 - 30 Tahun", count: 5013 },
  { label: "> 30 Tahun", count: 3432 },
];

const highestAgeGroup = Math.max(...ageGroups.map((group) => group.count), 1);

const notifications = [
  {
    id: "CC2019216",
    asset: "CC2019216, Lokomotif",
    depot: "Lokomotif",
    action: "Penggantian Unit Baru",
    severity: "critical" as BadgeVariant,
    due: "Segera",
    notes: "Melebihi umur ekonomis, bogie dan mesin utama riskan.",
  },
  {
    id: "K319603",
    asset: "K319603",
    depot: "Kereta Commuter Indonesia",
    action: "P48",
    severity: "warning" as BadgeVariant,
    due: "14 hari",
    notes: "Perlu dilakukan perawatan sebelum terjadi gangguan",
  },
  {
    id: "GB306520",
    asset: "GB 306520",
    depot: "Balai Yasa Tegal",
    action: "Tidak Laik Operasi",
    severity: "critical" as BadgeVariant,
    due: "Segera",
    notes: "Perlu dilakukan Joint Inspection bersama",
  },
];

const capexMaxValue = Math.max(...capexPlan.map((item) => item.value));
const capexPolyline = capexPlan
  .map((item, index) => {
    const x = (index / (capexPlan.length - 1)) * 100;
    const y = 100 - (item.value / capexMaxValue) * 100;
    return `${x},${y}`;
  })
  .join(" ");

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/40 to-white px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
        <Sidebar
          className={`self-start transition-transform duration-300 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-64 lg:translate-x-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            isSidebarOpen
              ? "fixed left-0 top-0 z-40 h-full w-[78%] max-w-xs translate-x-0 overflow-y-auto rounded-r-3xl bg-white/95 p-6 shadow-2xl backdrop-blur"
              : "fixed left-0 top-0 z-40 h-full w-[78%] max-w-xs -translate-x-[105%] overflow-y-auto rounded-r-3xl bg-white/95 p-6 shadow-2xl backdrop-blur"
          }`}
        >
          <SidebarHeader>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-400">Divisi Sarana</p>
            <p className="text-lg font-semibold">Command Hub</p>
            <p className="text-sm text-slate-500">Lifecycle & akuntansi sarana</p>
          </SidebarHeader>
          <SidebarContent>
            {sidebarSections.map((section) => (
              <SidebarMenu key={section.title} title={section.title}>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton type="button" active={item.active}>
                      {item.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ))}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400">Reliability Forecast</p>
              <p className="pt-1 text-2xl font-semibold text-slate-900">92%</p>
              <p className="text-xs text-slate-500">Sarana siap operasi tanpa gangguan.</p>
              <Progress value={92} className="mt-3" />
            </div>
          </SidebarContent>
          <SidebarFooter>
            <p>M. Ilham Ramadhani Prawoto - Pelaksana Management Trainee Program</p>
            <button type="button" className="mt-2 text-xs font-semibold text-slate-600 hover:text-slate-900">
              Logout
            </button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <Menu className="h-4 w-4" />
              Menu
            </button>
          </div>

          <section className="rounded-3xl border-none bg-white/95 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Lifecycle Dashboard</p>
                <h1 className="text-3xl font-semibold text-slate-900">Asset Lifecycle Management</h1>
                <p className="text-sm text-slate-500">
                  Klasifikasi Sarana berdasarkan Asset Health Index, Umur Sarana, Rekomendasi Peremajaan atau Penggantian Unit
                </p>
              </div>
              <div className="flex gap-3 flex-col">
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-slate-600 cursor-pointer ">
                  Share Snapshot
                </button>
                <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer hover:bg-slate-800">
                  Tambah Rencana
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="rounded-3xl border-none bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader className="space-y-1.5">
                <CardTitle>Total Sarana</CardTitle>
                <CardDescription>Sarana yang termonitor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">13.566 Unit</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">Lokomotif, Kereta dan Gerbong</p>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-none bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader className="space-y-1.5">
                <CardTitle>Perlu Peremajaan</CardTitle>
                <CardDescription>50% mendekati masa pakai</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">500 Unit</p>
                <p className="text-xs text-slate-500">Modifikasi, Repowering, Retrofit, Renewal</p>
                <Badge variant="warning" className="w-fit">
                  Batas 30 hari
                </Badge>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-none bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader className="space-y-1.5">
                <CardTitle>Penggantian (Replacement)</CardTitle>
                <CardDescription>Tidak laik operasi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">200 Unit</p>
                <p className="text-xs text-slate-500">Investasi melalui pengeluaran Capex</p>
                <Badge variant="critical" className="w-fit">
                  Segera realokasi
                </Badge>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-none bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader className="space-y-1.5">
                <CardTitle>Cost Benefit</CardTitle>
                <CardDescription>Potensi penghematan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-3xl font-semibold text-slate-900">Rp 100 Miliar</p>
                <p className="text-xs text-slate-500">Berdasarkan kalkulasi dan eskalasi</p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2 rounded-3xl border-none bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader>
                <CardTitle>Sebaran Sarana berdasarkan Umur</CardTitle>
                <CardDescription>Lokomotif, Kereta, dan Gerbong</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {ageGroups.map((group) => (
                  <div key={group.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{group.label}</span>
                      <span>{group.count} unit</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-slate-900 via-blue-500 to-sky-400"
                        style={{ width: `${(group.count / highestAgeGroup) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-xs text-slate-500">
                  Diperlukan strategi peremajaan atau penggantian terhadap aset-aset sarana yang mendekati umur ekonomisnya
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-none bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader>
                <CardTitle>Estimasi Capex</CardTitle>
                <CardDescription>simulasi biaya perawatan atau penggantian</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Total dialokasikan</p>
                    <p className="text-2xl font-semibold text-slate-900">Rp 512 Miliar</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Efisiensi</p>
                    <p className="text-lg font-semibold text-emerald-600">87%</p>
                  </div>
                </div>
                <div className="h-28 w-full rounded-2xl border border-slate-100 bg-slate-50 p-3">
                  <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="capex" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <polyline
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      points={capexPolyline}
                    />
                    <polygon fill="url(#capex)" points={`0,100 ${capexPolyline} 100,100`} opacity={0.4} />
                  </svg>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  {capexPlan.map((item) => (
                    <span key={item.label}>{item.label}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="">
            <Card className="lg:col-span-2 rounded-3xl border-none bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader>
                <CardTitle>Prioritas Sarana</CardTitle>
                <CardDescription>Urutan prioritas remajakan vs ganti unit</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-700">
                  <thead className="text-xs uppercase text-slate-400">
                    <tr>
                      <th className="pb-3">Sarana</th>
                      <th className="pb-3">Umur</th>
                      <th className="pb-3">Kondisi</th>
                      <th className="pb-3">Tindakan</th>
                      <th className="pb-3">Nilai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fleetAssets.map((asset) => (
                      <tr key={asset.id} className="border-t border-slate-100">
                        <td className="py-3">
                          <div>
                            <p className="font-semibold text-slate-900">{asset.name}</p>
                            <p className="text-xs text-slate-500">{asset.type}</p>
                          </div>
                        </td>
                        <td className="py-3 text-slate-700">
                          <div className="flex flex-col">
                            <span className="font-semibold">{asset.ageYears} th</span>
                            <span className="text-xs text-slate-500">Batas {asset.economicLife} th</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <Badge variant={assetStatusMap[asset.healthStatus].variant}>
                            {assetStatusMap[asset.healthStatus].label}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <Badge variant={asset.nextAction.includes("Ganti") ? "critical" : "warning"}>
                            {asset.nextAction}
                          </Badge>
                        </td>
                        <td className="py-3 text-slate-700">{formatBillion(asset.costProjection)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-3xl border-none bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader>
                <CardTitle>Notifikasi Lifecycle</CardTitle>
                <CardDescription>Sinyal peremajaan & penggantian unit</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.asset}</p>
                        <p className="text-xs text-slate-500">{item.depot}</p>
                      </div>
                      <Badge variant={item.severity}>{item.due}</Badge>
                    </div>
                    <p className="pt-2 text-xs text-slate-500">{item.action}</p>
                    <p className="text-sm text-slate-700">{item.notes}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-none bg-white/95 shadow-[0_15px_45px_rgba(15,23,42,0.08)] backdrop-blur">
              <CardHeader>
                <CardTitle>Pekerjaan terbaru</CardTitle>
                <CardDescription>Balai Yasa dan Depo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-5xl font-semibold text-slate-900">300 Perawatan</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">total realisasi 80%</p>
                </div>
                <div className="space-y-2">
                  {["P1 CC2019216", "P3 CC2019216", "P24 CC2019216", "P48 CC2019216"].map((task) => (
                    <div key={task} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <p className="text-sm font-semibold text-slate-900">{task}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
