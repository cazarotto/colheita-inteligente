import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, CalendarCheck, MapPin, FlaskConical, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const planejamentos = [
  { id: "1", operacao: "Plantio Soja", talhao: "T-01 Cerrado", insumo: "Semente TMG 2381", operador: "João Silva", maquina: "John Deere 8R", dataInicio: "15/03/2026", status: "em_andamento" as const },
  { id: "2", operacao: "Adubação", talhao: "T-05 Chapada", insumo: "MAP 10-46-00", operador: "Pedro Santos", maquina: "MF 8737", dataInicio: "16/03/2026", status: "pendente" as const },
  { id: "3", operacao: "Pulverização", talhao: "T-03 Barreiro", insumo: "Roundup WG", operador: "Carlos Mendes", maquina: "Uniport 3030", dataInicio: "18/03/2026", status: "pendente" as const },
];

const steps = [
  { num: 1, label: "Local", icon: MapPin },
  { num: 2, label: "Insumos", icon: FlaskConical },
  { num: 3, label: "Equipe", icon: Users },
];

export default function PlanejamentoPage() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleSave = () => {
    setOpen(false);
    setStep(1);
    toast.success("Operação planejada com sucesso!");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Planejamento"
        description="Planeje e organize as operações de campo"
        actions={
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setStep(1); }}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1.5">
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                Nova Operação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg mx-4">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-base">
                  <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                    <CalendarCheck className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
                  </div>
                  Planejar Operação
                </DialogTitle>
                <DialogDescription className="sr-only">Formulário de planejamento de operação</DialogDescription>
              </DialogHeader>

              {/* Step indicator */}
              <div className="flex items-center gap-1.5 py-2">
                {steps.map((s, i) => (
                  <div key={s.num} className="flex items-center gap-1.5 flex-1">
                    <button
                      onClick={() => setStep(s.num)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2.5 rounded-xl transition-all text-xs font-semibold w-full justify-center",
                        step === s.num
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : step > s.num
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <s.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                      <span>{s.label}</span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4 py-2">
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Tipo de Operação</Label>
                      <Select>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Selecione..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plantio">Plantio</SelectItem>
                          <SelectItem value="adubacao">Adubação</SelectItem>
                          <SelectItem value="pulverizacao">Pulverização</SelectItem>
                          <SelectItem value="colheita">Colheita</SelectItem>
                          <SelectItem value="dessecacao">Dessecação</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Talhão</Label>
                      <Select>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Selecione o talhão..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="t1">T-01 Cerrado (320 ha)</SelectItem>
                          <SelectItem value="t2">T-02 Vargem (180 ha)</SelectItem>
                          <SelectItem value="t3">T-03 Barreiro (250 ha)</SelectItem>
                          <SelectItem value="t4">T-04 Morro Alto (200 ha)</SelectItem>
                          <SelectItem value="t5">T-05 Chapada (280 ha)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Data de Início</Label>
                      <Input type="date" className="h-12" />
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Insumo Principal</Label>
                      <Select>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Selecione o insumo..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="semente">Semente TMG 2381</SelectItem>
                          <SelectItem value="map">MAP 10-46-00</SelectItem>
                          <SelectItem value="kcl">KCL 60%</SelectItem>
                          <SelectItem value="roundup">Roundup WG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dosagem</Label>
                      <Input placeholder="Ex: 200 kg/ha" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Observações</Label>
                      <Input placeholder="Notas adicionais..." className="h-12" />
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Operador</Label>
                      <Select>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Selecione o operador..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="joao">João Silva</SelectItem>
                          <SelectItem value="carlos">Carlos Mendes</SelectItem>
                          <SelectItem value="pedro">Pedro Santos</SelectItem>
                          <SelectItem value="jose">José Almeida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Máquina</Label>
                      <Select>
                        <SelectTrigger className="h-12"><SelectValue placeholder="Selecione a máquina..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="jd8r">John Deere 8R</SelectItem>
                          <SelectItem value="mf8737">MF 8737</SelectItem>
                          <SelectItem value="uniport">Uniport 3030</SelectItem>
                          <SelectItem value="s790">S790 Colhedora</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter className="flex gap-2 pt-2">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 h-11">
                    Voltar
                  </Button>
                )}
                {step < 3 ? (
                  <Button onClick={() => setStep(step + 1)} className="flex-1 h-11">
                    Próximo
                  </Button>
                ) : (
                  <Button onClick={handleSave} className="flex-1 h-11">
                    Salvar Operação
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <DataTable
        columns={[
          { header: "Operação", accessor: (r) => <span className="font-semibold">{r.operacao}</span> },
          { header: "Talhão", accessor: (r) => <span className="font-mono-data text-muted-foreground">{r.talhao}</span> },
          { header: "Insumo", accessor: "insumo", className: "hidden md:table-cell" },
          { header: "Operador", accessor: "operador", className: "hidden lg:table-cell" },
          { header: "Início", accessor: (r) => <span className="font-mono-data">{r.dataInicio}</span>, className: "hidden sm:table-cell" },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={planejamentos}
        mobileCard={{
          title: (r) => r.operacao,
          subtitle: (r) => r.talhao,
          badge: (r) => <StatusBadge status={r.status} />,
          fields: [
            { label: "Insumo", accessor: "insumo" },
            { label: "Início", accessor: (r) => <span className="font-mono-data">{r.dataInicio}</span> },
          ],
        }}
      />
    </div>
  );
}
