import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { DataTable } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, CalendarCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const planejamentos = [
  { id: "1", operacao: "Plantio Soja", talhao: "T-01 Cerrado", insumo: "Semente TMG 2381", operador: "João Silva", maquina: "John Deere 8R", dataInicio: "15/03/2026", status: "em_andamento" as const },
  { id: "2", operacao: "Adubação", talhao: "T-05 Chapada", insumo: "MAP 10-46-00", operador: "Pedro Santos", maquina: "MF 8737", dataInicio: "16/03/2026", status: "pendente" as const },
  { id: "3", operacao: "Pulverização", talhao: "T-03 Barreiro", insumo: "Roundup WG", operador: "Carlos Mendes", maquina: "Uniport 3030", dataInicio: "18/03/2026", status: "pendente" as const },
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
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" strokeWidth={2.5} />
                Nova Operação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CalendarCheck className="h-5 w-5 text-primary" strokeWidth={2.5} />
                  Planejar Operação — Etapa {step}/3
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label>Tipo de Operação</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
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
                      <Label>Talhão</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Selecione o talhão..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="t1">T-01 Cerrado</SelectItem>
                          <SelectItem value="t2">T-02 Vargem</SelectItem>
                          <SelectItem value="t3">T-03 Barreiro</SelectItem>
                          <SelectItem value="t4">T-04 Morro Alto</SelectItem>
                          <SelectItem value="t5">T-05 Chapada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Data de Início</Label>
                      <Input type="date" className="h-10 md:h-10" />
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label>Insumo Principal</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Selecione o insumo..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="semente">Semente TMG 2381</SelectItem>
                          <SelectItem value="map">MAP 10-46-00</SelectItem>
                          <SelectItem value="kcl">KCL 60%</SelectItem>
                          <SelectItem value="roundup">Roundup WG</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Dosagem</Label>
                      <Input placeholder="Ex: 200 kg/ha" className="h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Observações</Label>
                      <Input placeholder="Notas adicionais..." className="h-10" />
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label>Operador</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Selecione o operador..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="joao">João Silva</SelectItem>
                          <SelectItem value="carlos">Carlos Mendes</SelectItem>
                          <SelectItem value="pedro">Pedro Santos</SelectItem>
                          <SelectItem value="jose">José Almeida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Máquina</Label>
                      <Select>
                        <SelectTrigger><SelectValue placeholder="Selecione a máquina..." /></SelectTrigger>
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
              <DialogFooter className="flex gap-2">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Voltar
                  </Button>
                )}
                {step < 3 ? (
                  <Button onClick={() => setStep(step + 1)}>Próximo</Button>
                ) : (
                  <Button onClick={handleSave}>Salvar</Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />
      <DataTable
        columns={[
          { header: "Operação", accessor: (r) => <span className="font-medium">{r.operacao}</span> },
          { header: "Talhão", accessor: "talhao" },
          { header: "Insumo", accessor: "insumo", className: "hidden md:table-cell" },
          { header: "Operador", accessor: "operador", className: "hidden lg:table-cell" },
          { header: "Início", accessor: (r) => <span className="font-mono-data">{r.dataInicio}</span>, className: "hidden sm:table-cell" },
          { header: "Status", accessor: (r) => <StatusBadge status={r.status} /> },
        ]}
        data={planejamentos}
      />
    </div>
  );
}
