// convert JSON (from strapi) to options for react-select
import colors from "../../../constants/colors";

export type Option = {
  label: string;
  value: string;
  color: string;
  isFixed: boolean;
};

export function strapiArrayToOptions(arr: Array<string>): Option[] {
  return arr.map((currentValue) => {
    return {
      value: currentValue,
      label: currentValue,
      color: colors.text.primary,
      isFixed: true,
    };
  });
}

export function findOption(
  options: string[],
  value: string
): Option | undefined {
  const optionsArr = strapiArrayToOptions(options);

  return optionsArr.find((option) => option.value === value);
}
