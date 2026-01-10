import { MainLayout } from "@/components/layout/main-layout";
import { Playground } from "@/components/playground/playground";
import { ChatPanel } from "@/components/chat/chat-panel";

export function App() {
  return (
    <MainLayout>
      <Playground />
      <ChatPanel />
    </MainLayout>
  );
}

export default App;
