import { CrmLayout } from '@/layout';
import CrmPanel from '@/components/CrmPanel';
import QuoteForm from './QuoteForm';
import DataTableDropMenu from './DataTableDropMenu';

export default function InvoiceModule({ config }) {
  return (
    <CrmLayout>
      <CrmPanel
        config={config}
        CreateForm={QuoteForm}
        UpdateForm={QuoteForm}
        DataTableDropMenu={DataTableDropMenu}
      ></CrmPanel>
    </CrmLayout>
  );
}
