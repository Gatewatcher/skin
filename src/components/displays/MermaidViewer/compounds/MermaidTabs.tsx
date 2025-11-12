import { CodeBlock, MermaidViewer, Tabs } from '@/skin/displays';
import { Stack } from '@/skin/layout';

export type MermaidTabsProps = { code: string };

const MermaidTabs = ({ code }: MermaidTabsProps) => {
  return (
    <Tabs>
      <Tabs.TitleList variant="primary">
        <Tabs.Title>Diagram</Tabs.Title>
        <Tabs.Title>Code</Tabs.Title>
      </Tabs.TitleList>

      <Tabs.PanelList>
        <Tabs.Panel>
          <Stack direction="column" padding={{ y: 8 }}>
            <MermaidViewer code={code} />
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel>
          <Stack direction="column" padding={{ y: 8 }}>
            <CodeBlock code={code} language="mermaid" />
          </Stack>
        </Tabs.Panel>
      </Tabs.PanelList>
    </Tabs>
  );
};

export default MermaidTabs;
