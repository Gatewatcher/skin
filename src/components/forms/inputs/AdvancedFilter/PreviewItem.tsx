import type {
  ConditionerConditionType,
  ConditionerLogicalGroupType,
} from '@/skin/forms';
import { Text } from '@/skin/typography';

type PreviewItemProps = {
  mainGroup: ConditionerLogicalGroupType;
  subGroups: ConditionerLogicalGroupType[];
  conditions: ConditionerConditionType[];
};

const PreviewItem = ({
  mainGroup,
  subGroups,
  conditions,
}: PreviewItemProps) => {
  const mainGroupConditions = conditions.filter(condition =>
    mainGroup.conditionsId.find(conditionId => conditionId === condition.id),
  );
  const subGroupsOfMainGroup = subGroups.filter(
    subGroup => subGroup.subGroupOf === mainGroup.id,
  );

  return (
    <>
      {mainGroupConditions.map((mainGroupCondition, index) => {
        const isLast = mainGroupConditions.length === index + 1;

        return (
          <>
            <Text>{mainGroupCondition.observable?.label}: </Text>
            <Text color="green">
              {' '}
              {mainGroupCondition.operator?.label} {mainGroupCondition.value}{' '}
            </Text>
            {!isLast && (
              <Text color="blue" transform="uppercase">
                {mainGroup.logic}{' '}
              </Text>
            )}
          </>
        );
      })}
      {subGroupsOfMainGroup.map(subGroupOfMainGroup => (
        <>
          <Text color="blue" transform="uppercase">
            {mainGroup.logic}{' '}
          </Text>
          <Text> (</Text>
          <PreviewItem
            conditions={conditions}
            mainGroup={subGroupOfMainGroup}
            subGroups={subGroups}
          />
          <Text>) </Text>
        </>
      ))}
    </>
  );
};

export default PreviewItem;
