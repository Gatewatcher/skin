import { classNames } from '@gatewatcher/bistoury/utils-dom';
import { isString } from '@gatewatcher/bistoury/utils-lang';
import type { DataTestId } from '@gatewatcher/bistoury/utils-types';
import type { ReactElement, ReactNode } from 'react';

import type { BreadcrumbProps } from '@/skin/feedback';
import { Grid, Stack } from '@/skin/layout';
import { Title } from '@/skin/typography';

import Spaced from '../components/Spaced';

import styles from '../styles.module.scss';

export type RouteContainerHeaderProps = DataTestId & {
  actions?: ReactNode;
  badge?: ReactNode;
  breadcrumb?: ReactElement<BreadcrumbProps>;
  isSticky?: boolean;
  navigation?: ReactNode;
  subtitle?: string;
  title: string | ReactElement<typeof Title>;
  withMarginBottom?: boolean;
};

const Header = ({
  'data-testid': testId = 'route-container-header',
  title,
  subtitle,
  breadcrumb,
  actions,
  navigation,
  badge,
  isSticky,
  withMarginBottom = true,
}: RouteContainerHeaderProps) => {
  return (
    <div
      className={classNames(
        styles.Header,
        withMarginBottom && styles.HeaderMargin,
        isSticky && styles.sticky,
      )}
      data-testid={testId}
    >
      {breadcrumb}
      {subtitle && (
        <Spaced direction="column" spacing={breadcrumb && 8}>
          <Grid columns={4} isContainer>
            <Stack alignItems="center" gap={6}>
              {isString(title) ? <Title>{title}</Title> : title}
              {badge}
            </Stack>
            {navigation && (
              <Grid colSpan={2} isItem>
                <Stack justifyContent="center">{navigation}</Stack>
              </Grid>
            )}
            {!navigation && (
              <Grid colSpan={3} isItem>
                <Spaced gap={6} shifted>
                  {actions}
                </Spaced>
              </Grid>
            )}
          </Grid>
          <Spaced alignItems="center" gap={6} spacing={8}>
            {isString(subtitle) ? <Title as="h2">{subtitle}</Title> : subtitle}
            {navigation && (
              <Spaced gap={6} shifted>
                {actions}
              </Spaced>
            )}
          </Spaced>
        </Spaced>
      )}

      {!subtitle && navigation && (
        <Spaced direction="column" spacing={breadcrumb && 8}>
          <Grid columns={4} isContainer>
            <Stack alignItems="center" gap={6}>
              {isString(title) ? <Title>{title}</Title> : title}
              {badge}
            </Stack>
            {navigation && (
              <Grid colSpan={2} isItem>
                <Stack justifyContent="center">{navigation}</Stack>
              </Grid>
            )}
            {actions && (
              <Stack alignItems="center" gap={8} justifyContent="flex-end">
                {actions}
              </Stack>
            )}
          </Grid>
        </Spaced>
      )}

      {!subtitle && !navigation && (
        <Spaced spacing={breadcrumb && 8}>
          <Stack alignItems="center" gap={6}>
            {isString(title) ? <Title>{title}</Title> : title}
            {badge}
          </Stack>
          <Spaced gap={6} shifted>
            {actions}
          </Spaced>
        </Spaced>
      )}
    </div>
  );
};

export default Header;
