import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './adapters/ui/app';
import { LocalStorageTaskRepository } from './adapters/storage/local-storage-task-repository';
import './styles.css';

const repository = new LocalStorageTaskRepository('todo-list:tasks');
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found');
}
createRoot(rootElement).render(
  <StrictMode>
    <App repository={repository} />
  </StrictMode>,
);
