import type { Meta, StoryObj } from '@storybook/react';

import MermaidViewer from '.';

const code = `
flowchart TD
    A["Inputs (Logs, SIEM, API, User)"] --> B["LangChain Orchestration, Parsing, Tools"]
    B --> C["LangGraph Advanced Workflow & Logic"]
    B --> D["LLM OpenAI (GPT-4, GPT-4o)"]
    B --> E["Cybersecurity Tools (Enrichment, Actions)"]
    B --> F["Langfuse Monitoring & Logs"]
    D --> G["Outputs (Report, Alert, Action)"]
    E --> G
    F --> G
`;

const invalidCode = `
// no comments allowed in mermaid code
flowchart TD
    A["Inputs (Logs, SIEM, API, User)"] --> B["LangChain Orchestration, Parsing, Tools"]
    B --> C["LangGraph Advanced Workflow & Logic"]
    B --> D["LLM OpenAI (GPT-4, GPT-4o)"]
    B --> E["Cybersecurity Tools (Enrichment, Actions)"]
    B --> F["Langfuse Monitoring & Logs"]
    D --> G["Outputs (Report, Alert, Action)"]
    E --> G
    F --> G
`;

type Story = StoryObj<typeof MermaidViewer>;

export default {
  title: 'displays/MermaidViewer',
  component: MermaidViewer,
} as Meta<typeof MermaidViewer>;

export const Default: Story = {
  args: {
    code,
  },
};

export const InvalidCode: Story = {
  args: {
    code: invalidCode,
  },
};
