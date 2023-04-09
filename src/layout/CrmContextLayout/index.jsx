import React from 'react';

import { CrmContextProvider } from '@/context/crm';

function CrmContextLayout({ children }) {
  return <CrmContextProvider>{children}</CrmContextProvider>;
}

export default CrmContextLayout;
