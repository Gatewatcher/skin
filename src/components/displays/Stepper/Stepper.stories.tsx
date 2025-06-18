import { faker } from '@faker-js/faker/locale/en';
import type { Meta, StoryObj } from '@storybook/react';

import { ButtonAsync } from '@/skin/actions';
import { Form, Input } from '@/skin/forms';
import { Grid, Stack } from '@/skin/layout';
import { Paragraph, Text } from '@/skin/typography';

import Stepper from '.';
import Section from '../Section';

faker.seed(42);

type Story = StoryObj<typeof Stepper>;

export default {
  title: 'displays/Stepper',
  component: Stepper,
} as Meta<typeof Stepper>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Stepper.TitleList>
          <Stepper.Title>Upload</Stepper.Title>
          <Stepper.Title>Extract</Stepper.Title>
          <Stepper.Title>Content</Stepper.Title>
        </Stepper.TitleList>

        <Stepper.PanelList>
          <Stepper.Panel>
            <Section>
              <Section.Header>
                <Section.Title>Upload</Section.Title>
                <Section.Button onClick={() => {}} startIcon="ExternalLink">
                  Help
                </Section.Button>
              </Section.Header>

              <Section.Body>
                <Paragraph>{faker.lorem.paragraphs(3)}</Paragraph>
              </Section.Body>
            </Section>
          </Stepper.Panel>
          <Stepper.Panel>
            <Section>
              <Section.Header>
                <Section.Title>Extract</Section.Title>
                <Section.Button onClick={() => {}} startIcon="ExternalLink">
                  Help
                </Section.Button>
              </Section.Header>

              <Section.Body>
                <Paragraph>{faker.lorem.paragraphs(3)}</Paragraph>
              </Section.Body>
            </Section>
          </Stepper.Panel>
          <Stepper.Panel>
            <Section>
              <Section.Header>
                <Section.Title>Content</Section.Title>
                <Section.Button onClick={() => {}} startIcon="ExternalLink">
                  Help
                </Section.Button>
              </Section.Header>

              <Section.Body>
                <Paragraph>{faker.lorem.paragraphs(3)}</Paragraph>
              </Section.Body>
            </Section>
          </Stepper.Panel>
        </Stepper.PanelList>

        <Stepper.Navigation
          submit={
            <ButtonAsync
              onClick={() => new Promise(resolve => setTimeout(resolve, 3000))}
            >
              Submit
            </ButtonAsync>
          }
          next={<Stepper.Next>Next</Stepper.Next>}
          prev={<Stepper.Prev>Prev</Stepper.Prev>}
        />
      </>
    ),
  },
};

export const AsForm: Story = {
  args: {
    children: (
      <>
        <Stepper.TitleList>
          <Stepper.Title>Identity</Stepper.Title>
          <Stepper.Title>Adress</Stepper.Title>
          <Stepper.Title>Paiement</Stepper.Title>
        </Stepper.TitleList>

        <Form onFinish={values => console.log(values)}>
          <Stepper.PanelList>
            <Stepper.Panel>
              <Section>
                <Section.Header>
                  <Section.Title>Identity</Section.Title>
                </Section.Header>

                <Section.Body>
                  <Grid columns={2} gap={10} isContainer>
                    <Form.Field initialValue="John" name="firstname">
                      <Input.Text placeholder="firstname" />
                    </Form.Field>

                    <Form.Field initialValue="Doe" name="lastname">
                      <Input.Text placeholder="lastname" />
                    </Form.Field>

                    <Form.Field initialValue="JoDo" name="pseudo">
                      <Input.Text placeholder="pseudo" />
                    </Form.Field>

                    <Form.Field name="gender">
                      <Stack direction="column">
                        <Text>Gender</Text>

                        <Stack gap={10}>
                          <Input.Radio
                            label="male"
                            name="gender"
                            value="male"
                          />
                          <Input.Radio
                            label="female"
                            name="gender"
                            value="female"
                          />
                        </Stack>
                      </Stack>
                    </Form.Field>
                  </Grid>
                </Section.Body>
              </Section>
            </Stepper.Panel>

            <Stepper.Panel>
              <Section>
                <Section.Header>
                  <Section.Title>Adress</Section.Title>
                </Section.Header>

                <Section.Body>
                  <Grid columns={8} isContainer>
                    <Grid colSpan={1} isItem>
                      <Form.Field name="numero">
                        <Input.Number min={0} placeholder="4" />
                      </Form.Field>
                    </Grid>

                    <Grid colSpan={7} isItem>
                      <Form.Field name="street">
                        <Input.Text placeholder="Picadilly street" />
                      </Form.Field>
                    </Grid>

                    <Grid colSpan={1} isItem>
                      <Form.Field name="zipcode">
                        <Input.Number min={0} placeholder="75019" />
                      </Form.Field>
                    </Grid>

                    <Grid colSpan={7} isItem>
                      <Form.Field name="city">
                        <Input.Text placeholder="London" />
                      </Form.Field>
                    </Grid>
                  </Grid>
                </Section.Body>
              </Section>
            </Stepper.Panel>

            <Stepper.Panel>
              <Section>
                <Section.Header>
                  <Section.Title>Paiement</Section.Title>
                </Section.Header>

                <Section.Body>
                  <Grid columns={8} isContainer>
                    <Grid colSpan={6} isItem>
                      <Form.Field name="cardNumber">
                        <Input.Text placeholder="1111 xxxx xxxx xxxx" />
                      </Form.Field>
                    </Grid>

                    <Grid colSpan={1} isItem>
                      <Form.Field name="expiration">
                        <Input.Text placeholder="12/2023" />
                      </Form.Field>
                    </Grid>

                    <Grid colSpan={1} isItem>
                      <Form.Field name="ccv">
                        <Input.Text placeholder="000" />
                      </Form.Field>
                    </Grid>
                  </Grid>
                </Section.Body>
              </Section>
            </Stepper.Panel>
          </Stepper.PanelList>

          <Stepper.Navigation
            submit={
              <ButtonAsync
                onClick={() =>
                  new Promise(resolve => setTimeout(resolve, 3000))
                }
              >
                Submit
              </ButtonAsync>
            }
            next={<Stepper.Next>Next</Stepper.Next>}
            prev={<Stepper.Prev>Prev</Stepper.Prev>}
          />
        </Form>
      </>
    ),
  },
};
