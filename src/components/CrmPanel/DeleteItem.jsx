import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { crm } from '@/redux/crm/actions';
import { useCrmContext } from '@/context/crm';
import { selectDeletedItem } from '@/redux/crm/selectors';
import { valueByString } from '@/utils/helpers';

export default function Delete({ config }) {
  let {
    entity,
    entityDisplayLabels,
    deleteMessage = 'Do you want delete : ',
    modalTitle = 'Remove Item',
  } = config;
  const dispatch = useDispatch();
  const { current, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const { state, crmContextAction } = useCrmContext();
  const { deleteModal } = state;
  const { modal } = crmContextAction;
  const [displayItem, setDisplayItem] = useState('');

  useEffect(() => {
    if (isSuccess) {
      modal.close();
      dispatch(crm.list({ entity }));
    }
    if (current) {
      let labels = entityDisplayLabels.map((x) => valueByString(current, x)).join(' ');

      setDisplayItem(labels);
    }
  }, [isSuccess, current]);

  const handleOk = () => {
    const id = current._id;
    dispatch(crm.delete({ entity, id }));
  };
  const handleCancel = () => {
    if (!isLoading) modal.close();
  };
  return (
    <Modal
      title={modalTitle}
      visible={deleteModal.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <p>
        {deleteMessage}
        {displayItem}
      </p>
    </Modal>
  );
}
