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
    id: "CC206-01",
    name: "Lokomotif CC206-01",
    type: "Lokomotif",
    depot: "Balai Yasa Manggarai",
    ageYears: 32,
    economicLife: 30,
    canBeRejuvenated: false,
    healthStatus: "critical",
    nextAction: "Ganti Unit Baru",
    lastMaintenance: "2023-11-18",
    costProjection: 48,
    availability: 0.71,
    notes: "Sudah melewati jam operasi maksimum + retakan bogie.",
  },
  {
    id: "ARGO-01",
    name: "Rangkaian Eksekutif Argo Bromo",
    type: "Kereta Penumpang",
    depot: "Balai Yasa Madiun",
    ageYears: 28,
    economicLife: 30,
    canBeRejuvenated: true,
    healthStatus: "warning",
    nextAction: "Peremajaan Interior & HVAC",
    lastMaintenance: "2024-04-10",
    costProjection: 22,
    availability: 0.86,
    notes: "Interior mulai menurun, potensi upgrade menjaga nilai jual.",
  },
  {
    id: "JR205-12",
    name: "KRL JR 205 Set 12",
    type: "KRL",
    depot: "Depo Bukit Duri",
    ageYears: 26,
    economicLife: 25,
    canBeRejuvenated: true,
    healthStatus: "warning",
    nextAction: "Peremajaan Sistem Propulsi",
    lastMaintenance: "2024-02-22",
    costProjection: 18,
    availability: 0.78,
    notes: "Efisiensi energi turun 7%, butuh retrofit inverter.",
  },
  {
    id: "G90-44",
    name: "Gerbong Barang G-90",
    type: "Gerbong Barang",
    depot: "Balai Yasa Tegal",
    ageYears: 34,
    economicLife: 28,
    canBeRejuvenated: false,
    healthStatus: "critical",
    nextAction: "Penggantian Total",
    lastMaintenance: "2022-09-14",
    costProjection: 12,
    availability: 0.58,
    notes: "Struktur utama korosi berat, tidak ekonomis diremajakan.",
  },
  {
    id: "KRD-07",
    name: "KRD Lintas Bandung",
    type: "KRD",
    depot: "Dipo Bandung",
    ageYears: 18,
    economicLife: 25,
    canBeRejuvenated: true,
    healthStatus: "improving",
    nextAction: "Peremajaan Sistem Kelistrikan",
    lastMaintenance: "2024-05-02",
    costProjection: 9,
    availability: 0.91,
    notes: "Program rewire bertahap meningkatkan keandalan 4%.",
  },
  {
    id: "STAIN-02",
    name: "Kereta Tidur Stainless",
    type: "Kereta Penumpang",
    depot: "Balai Yasa Surabaya",
    ageYears: 12,
    economicLife: 35,
    canBeRejuvenated: true,
    healthStatus: "stabil",
    nextAction: "Optimasi Interval",
    lastMaintenance: "2024-01-16",
    costProjection: 6,
    availability: 0.95,
    notes: "Masih prima, cukup optimasi jadwal inspeksi.",
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
  { label: "< 15 th", min: 0, max: 15 },
  { label: "15 - 25 th", min: 15, max: 25 },
  { label: "25 - 30 th", min: 25, max: 30 },
  { label: "> 30 th", min: 30, max: 100 },
].map((group) => ({
  ...group,
  count: fleetAssets.filter((asset) => asset.ageYears >= group.min && asset.ageYears < group.max).length,
}));

const highestAgeGroup = Math.max(...ageGroups.map((group) => group.count), 1);

const notifications = fleetAssets
  .filter((asset) => asset.ageYears >= asset.economicLife - 1)
  .map((asset) => {
    const severity: BadgeVariant = asset.healthStatus === "critical" ? "critical" : asset.canBeRejuvenated ? "warning" : "muted";
    return {
      id: asset.id,
      asset: asset.name,
      depot: asset.depot,
      action: asset.nextAction,
      severity,
      due: severity === "critical" ? "Segera" : asset.canBeRejuvenated ? "14 hari" : "30 hari",
      notes: asset.notes,
    };
  });

const opportunityIdeas = [
  { label: "Retrofit propulsi KRL JR 205", impact: "+12% efisiensi" },
  { label: "Rebody gerbong G-90 tahap 2", impact: "Hemat Rp18M" },
  { label: "Optimasi jadwal inspeksi stainless", impact: "Potensi -8% biaya" },
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
  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row">
        <Sidebar className="self-start px-0 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-64">
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
            <p>Akhmad Ramadhan · Chief Rolling Stock</p>
            <button type="button" className="mt-2 text-xs font-semibold text-slate-600 hover:text-slate-900">
              Logout
            </button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Lifecycle Dashboard</p>
                <h1 className="text-3xl font-semibold text-slate-900">KAI Sarana Lifecycle Command Center</h1>
                <p className="text-sm text-slate-500">
                  Klasifikasi umur sarana, rekomendasi peremajaan, dan indikasi penggantian unit.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-slate-300">
                  Share Snapshot
                </button>
                <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm">
                  Tambah Rencana
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader className="space-y-1.5">
                <CardTitle>Portfolio Sarana</CardTitle>
                <CardDescription>Unit aktif yang termonitor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">{summary.totalAssets} unit</p>
                <p className="text-xs uppercase tracking-wide text-slate-400">Campuran Loco / KRL / Kereta</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-1.5">
                <CardTitle>Perlu Remajakan</CardTitle>
                <CardDescription>80% mendekati batas ekonomis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">{summary.rejuvenationNeeded}</p>
                <p className="text-xs text-slate-500">Fokus prioritas remajakan progresif.</p>
                <Badge variant="warning" className="w-fit">
                  Batas 30 hari
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-1.5">
                <CardTitle>Wajib Ganti</CardTitle>
                <CardDescription>Melampaui umur ekonomis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">{summary.replacementNeeded}</p>
                <p className="text-xs text-slate-500">Realokasi unit ke program capex.</p>
                <Badge variant="critical" className="w-fit">
                  Segera realokasi
                </Badge>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="space-y-1.5">
                <CardTitle>Nilai Ekonomi Terjaga</CardTitle>
                <CardDescription>Potensi biaya jika diremajakan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <p className="text-3xl font-semibold text-slate-900">{formatBillion(summary.protectedValue)}</p>
                <p className="text-xs text-slate-500">Estimasi penghematan terhadap penggantian unit.</p>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Distribusi Umur Sarana</CardTitle>
                <CardDescription>Menunjukkan konsentrasi umur aset campuran</CardDescription>
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
                        className="h-full rounded-full bg-gradient-to-r from-slate-900 via-blue-500 to-sky-400"
                        style={{ width: `${(group.count / highestAgeGroup) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-xs text-slate-500">Dominasi aset di atas 25 tahun perlu strategi remajakan terintegrasi.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Rencana Capex 2024</CardTitle>
                <CardDescription>Simulasi realokasi biaya peremajaan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">Total dialokasikan</p>
                    <p className="text-2xl font-semibold text-slate-900">{formatBillion(520)}</p>
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

          <section className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
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
            <Card>
              <CardHeader>
                <CardTitle>Opportunity Score</CardTitle>
                <CardDescription>Prioritas inisiatif nilai ekonomi</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-5xl font-semibold text-slate-900">88</p>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {summary.availability}% availability rata-rata
                  </p>
                </div>
                <Progress value={88} />
                <div className="space-y-3">
                  {opportunityIdeas.map((idea) => (
                    <div key={idea.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                      <p className="text-sm font-semibold text-slate-900">{idea.label}</p>
                      <p className="text-xs text-emerald-600">{idea.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <Card>
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
            <Card>
              <CardHeader>
                <CardTitle>Insight Ekonomi</CardTitle>
                <CardDescription>Pemetaan cepat dampak biaya</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Potensi penghematan</p>
                  <p className="text-3xl font-semibold text-slate-900">{formatBillion(summary.protectedValue * 0.42)}</p>
                  <p className="text-xs text-blue-600">42% biaya dapat diremajakan ulang dibanding penggantian.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Sarana di atas 30 th</p>
                    <p className="text-2xl font-semibold text-slate-900">
                      {fleetAssets.filter((asset) => asset.ageYears >= 30).length}
                    </p>
                    <p className="text-xs text-slate-500">Perlu keputusan ganti unit</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Proyek siap tender</p>
                    <p className="text-2xl font-semibold text-slate-900">3</p>
                    <p className="text-xs text-slate-500">Retrofit KRL, rebody gerbong, interior eksekutif</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-100 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Catatan keuangan</p>
                  <p className="text-sm text-slate-700">
                    Kombinasi remajakan + ganti unit menjaga utilisasi di {summary.availability}% dan menahan kebocoran biaya capex sampai Rp 210 Miliar.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
