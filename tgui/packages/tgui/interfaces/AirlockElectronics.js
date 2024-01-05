// code\game\machinery\doors\airlock_electronics.dm
import { useBackend } from '../backend';
import { Button, Divider, Grid, Section, Stack } from '../components';
import { Window } from '../layouts';
import { AccessList } from './common/AccessList';

const NORTH = 1;
const SOUTH = 2;
const EAST = 4;
const WEST = 8;

export const AirlockElectronics = (props, context) => {
  return (
    <Window width={450} height={565}>
      <UnrestrictedAccess />
      <Divider />
      <ChooseAccess />
    </Window>
  );
};

const UnrestrictedAccess = (props, context) => {
  const { act, data } = useBackend(context);
  const { unrestricted_dir } = data;
  return (
    <Section title="Access Control">
      <Stack fill vertical>
        <Stack.Item bold>Unrestricted Access From:</Stack.Item>
        <Grid mt={1}>
          <Grid.Column>
            <Button
              fluid
              textAlign="center"
              icon="arrow-down"
              content="North"
              selected={unrestricted_dir & NORTH ? 'selected' : null}
              onClick={() =>
                act('unrestricted_access', {
                  unres_dir: NORTH,
                })
              }
            />
          </Grid.Column>
          <Grid.Column>
            <Button
              fluid
              textAlign="center"
              icon="arrow-up"
              content="South"
              selected={unrestricted_dir & SOUTH ? 'selected' : null}
              onClick={() =>
                act('unrestricted_access', {
                  unres_dir: SOUTH,
                })
              }
            />
          </Grid.Column>
          <Grid.Column>
            <Button
              fluid
              textAlign="center"
              icon="arrow-left"
              content="East"
              selected={unrestricted_dir & EAST ? 'selected' : null}
              onClick={() =>
                act('unrestricted_access', {
                  unres_dir: EAST,
                })
              }
            />
          </Grid.Column>
          <Grid.Column>
            <Button
              fluid
              textAlign="center"
              icon="arrow-right"
              content="West"
              selected={unrestricted_dir & WEST ? 'selected' : null}
              onClick={() =>
                act('unrestricted_access', {
                  unres_dir: WEST,
                })
              }
            />
          </Grid.Column>
        </Grid>
      </Stack>
    </Section>
  );
};

const ChooseAccess = (props, context) => {
  const { act, data } = useBackend(context);
  const { selected_accesses, one_access, regions } = data;
  return (
    <AccessList
      usedByRcd={1}
      rcdButtons={
        <>
          <Button.Checkbox
            checked={one_access}
            content="One"
            onClick={() =>
              act('set_one_access', {
                access: 'one',
              })
            }
          />
          <Button.Checkbox
            checked={!one_access}
            content="All"
            onClick={() =>
              act('set_one_access', {
                access: 'all',
              })
            }
          />
        </>
      }
      accesses={regions}
      selectedList={selected_accesses}
      accessMod={(ref) =>
        act('set', {
          access: ref,
        })
      }
      grantAll={() => act('grant_all')}
      denyAll={() => act('clear_all')}
      grantDep={(ref) =>
        act('grant_region', {
          region: ref,
        })
      }
      denyDep={(ref) =>
        act('deny_region', {
          region: ref,
        })
      }
    />
  );
};
