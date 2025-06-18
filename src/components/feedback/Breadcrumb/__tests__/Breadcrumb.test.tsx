import { range } from '@gatewatcher/bistoury/utils-lang';
import { expectToBeVisibleInTheDocument } from '@gatewatcher/bistoury/utils-tests';
import type { TestId } from '@gatewatcher/bistoury/utils-types';
import { screen } from '@testing-library/react';
import type { ReactElement } from 'react';

import type { LinkInternalProps } from '@/skin/actions';
import { LinkInternal } from '@/skin/actions';
import { Text } from '@/skin/typography';
import { renderWithRouter } from '@/tests';

import type { BreadcrumbProps } from '..';
import Breadcrumb from '..';

describe('Breadcrumb', () => {
  const TEST_ID: TestId = 'breadcrumb';

  const generateLinks = (count: number): ReactElement<LinkInternalProps>[] =>
    range({ stop: count }).map(id => (
      <LinkInternal key={id} to={`link${id + 1}`}>
        Link {id + 1}
      </LinkInternal>
    ));

  const renderComponent = ({
    children,
    ...props
  }: Partial<BreadcrumbProps> = {}) =>
    renderWithRouter(
      <Breadcrumb data-testid={TEST_ID} {...props}>
        {children || generateLinks(2)}
      </Breadcrumb>,
    );

  const getBreadcrumb = async () => await screen.findByTestId('breadcrumb');

  it('should render', async () => {
    renderComponent();
    await expectToBeVisibleInTheDocument(TEST_ID);
  });

  it('should have 2 links', async () => {
    renderComponent({ children: generateLinks(2) });
    const breadcrumb = await getBreadcrumb();
    expect(breadcrumb.childNodes).toHaveLength(2);
  });

  it('should have only 2 chevrons', async () => {
    renderComponent({ children: generateLinks(3) });
    const breadcrumb = await getBreadcrumb();
    expect(breadcrumb.childNodes).toHaveLength(3);
    const icons = await screen.findAllByRole('img');
    expect(icons).toHaveLength(2);
  });

  it('last element should be a semibold text', async () => {
    renderComponent({
      children: [...generateLinks(2), <Text key="last">Last</Text>],
    });
    expect(await screen.findByText('Last')).toHaveClass(
      'Text',
      'weightSemibold',
    );
  });
});
