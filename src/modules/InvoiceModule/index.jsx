import { CrmLayout } from '@/layout';
import CrmPanel from '@/components/CrmPanel';
import InvoiceForm from './InvoiceForm';
import DataTableDropMenu from './DataTableDropMenu';

export default function InvoiceModule({ config }) {
  return (
    <CrmLayout>
      <CrmPanel
        config={config}
        CreateForm={InvoiceForm}
        UpdateForm={InvoiceForm}
        DataTableDropMenu={DataTableDropMenu}
      ></CrmPanel>
    </CrmLayout>
  );
}
