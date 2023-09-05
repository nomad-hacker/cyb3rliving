"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";
import { useState } from "react";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: string;
  onCountryChange: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onCountryChange,
}) => {
  const { getAll, getByLabel } = useCountries();
  const [country, setCountry] = useState<CountrySelectValue | undefined>(
    value ? getByLabel(value) : undefined
  );

  const onSelectedCountryChange = (value: CountrySelectValue) => {
    setCountry(value);
    onCountryChange(value.label);
  };

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={country}
        onChange={(value) =>
          onSelectedCountryChange(value as CountrySelectValue)
        }
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3"
          >
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
