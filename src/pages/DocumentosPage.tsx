import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Download, Eye, File, FileSpreadsheet, FileImage } from "lucide-react";

const documentos = [
  { id: "1", nome: "Contrato Venda Soja - Cargill", tipo: "PDF", tamanho: "2,4 MB", data: "01/03/2026", icon: File },
  { id: "2", nome: "Nota Fiscal Sementes TMG", tipo: "PDF", tamanho: "1,1 MB", data: "05/02/2026", icon: File },
  { id: "3", nome: "Planilha Custos Safra 25/26", tipo: "XLSX", tamanho: "890 KB", data: "15/01/2026", icon: FileSpreadsheet },
  { id: "4", nome: "Mapa de Talhões - Georreferenciamento", tipo: "PDF", tamanho: "5,2 MB", data: "10/09/2025", icon: File },
  { id: "5", nome: "Laudo Análise de Solo T-01", tipo: "PDF", tamanho: "3,8 MB", data: "20/08/2025", icon: File },
  { id: "6", nome: "Fotos Aéreas - Drone Mar/2026", tipo: "ZIP", tamanho: "48 MB", data: "12/03/2026", icon: FileImage },
];

export default function DocumentosPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Documentos"
        description="Arquivos e documentos da fazenda"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Upload
          </Button>
        }
      />

      <div className="flex items-center gap-4 p-4 premium-card">
        <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
          <FileText className="h-5 w-5 text-primary" strokeWidth={2} />
        </div>
        <div>
          <p className="text-sm font-semibold">6 documentos</p>
          <p className="text-xs text-muted-foreground">61,4 MB armazenados</p>
        </div>
      </div>

      <div className="space-y-2">
        {documentos.map((doc) => (
          <div key={doc.id} className="premium-card p-4 flex items-center gap-3 md:gap-4 group">
            <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
              <doc.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{doc.nome}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                <span className="font-mono-data">{doc.tipo}</span>
                <span>·</span>
                <span className="font-mono-data">{doc.tamanho}</span>
                <span className="hidden sm:inline">·</span>
                <span className="hidden sm:inline font-mono-data">{doc.data}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <Eye className="h-4 w-4" strokeWidth={2} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <Download className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
