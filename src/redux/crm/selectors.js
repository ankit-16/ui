import { createSelector } from 'reselect';

const selectCrm = (state) => state.crm;

export const selectCurrentItem = createSelector([selectCrm], (crm) => crm.current);

export const selectListItems = createSelector([selectCrm], (crm) => crm.list);
export const selectItemById = (itemId) =>
  createSelector(selectListItems, (list) => list.result.items.find((item) => item._id === itemId));

export const selectCreatedItem = createSelector([selectCrm], (crm) => crm.create);

export const selectUpdatedItem = createSelector([selectCrm], (crm) => crm.update);

export const selectRecordPaymentItem = createSelector([selectCrm], (crm) => crm.recordPayment);

export const selectReadItem = createSelector([selectCrm], (crm) => crm.read);

export const selectDeletedItem = createSelector([selectCrm], (crm) => crm.delete);

export const selectSearchedItems = createSelector([selectCrm], (crm) => crm.search);
