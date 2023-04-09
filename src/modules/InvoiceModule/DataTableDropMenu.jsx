import { Menu } from 'antd';

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { crm } from '@/redux/crm/actions';
import { selectItemById } from '@/redux/crm/selectors';
import { useCrmContext } from '@/context/crm';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import uniqueId from '@/utils/uinqueId';

export default function DataTableDropMenu({ row, entity }) {
  const dispatch = useDispatch();
  const { crmContextAction } = useCrmContext();
  const { readPanel, updatePanel, recordPanel, modal } = crmContextAction;
  const item = useSelector(selectItemById(row._id));
  function Read() {
    dispatch(crm.currentItem({ data: item }));
    readPanel.open();
  }
  function RecordPayment() {
    dispatch(crm.currentAction({ actionType: 'recordPayment', data: item }));
    recordPanel.open();
    dispatch(crm.currentItem({ data: item }));
  }
  function Edit() {
    dispatch(crm.currentAction({ actionType: 'update', data: item }));
    updatePanel.open();
  }
  function Delete() {
    dispatch(crm.currentAction({ actionType: 'delete', data: item }));
    modal.open();
  }
  function Download() {
    window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${row._id}.pdf`, '_blank');
  }
  return (
    <Menu style={{ minWidth: 130 }}>
      <Menu.Item key={`${uniqueId()}`} icon={<EyeOutlined />} onClick={Read}>
        Show
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<CreditCardOutlined />} onClick={RecordPayment}>
        Record Payment
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<EditOutlined />} onClick={Edit}>
        Edit
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<FilePdfOutlined />} onClick={Download}>
        Download
      </Menu.Item>
      <Menu.Item key={`${uniqueId()}`} icon={<DeleteOutlined />} onClick={Delete}>
        Delete
      </Menu.Item>
    </Menu>
  );
}
