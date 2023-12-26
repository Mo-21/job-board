"use client";
import { skillsArray } from "@/app/skills";
import styles from "../styles/SelectMenu.module.css";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { UseFormSetValue } from "react-hook-form";
import { ProfileCreationFormType } from "../validationSchema";

interface SelectMenuProps {
  setValue: UseFormSetValue<ProfileCreationFormType>;
}

const SelectMenu = ({ setValue }: SelectMenuProps) => {
  const [skills, setSkills] = useState<string[]>(skillsArray);
  const [query, setQuery] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setValue("skills", selectedSkills);
  }, [setValue, selectedSkills]);

  const filteredSkills = useMemo(() => {
    if (!query) return skills;
    return skills.filter((skill) => {
      return skill.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, skills]);

  const props = {
    filteredSkills,
    isOpen,
    selectedSkills,
    setSelectedSkills,
    setIsOpen,
    setQuery,
    query,
  };

  return (
    <div className={`${styles.container}`}>
      {selectedSkills.length > 0 && <SelectedSkillsMenu props={props} />}
      <div className={styles.input_bar_container}>
        <SelectInput props={props} />
      </div>
      {isOpen && <SelectList props={props} />}
    </div>
  );
};

const SelectedSkillsMenu = ({ props }: Props) => {
  return (
    <div className={styles.selected_skills_bar}>
      {props.selectedSkills.map((selectedSkill, index: number) => (
        <span
          key={index}
          onClick={() => {
            props.setSelectedSkills(
              props.selectedSkills.filter((skill) => skill !== selectedSkill)
            );
          }}
          className={styles.selected_skill}
        >
          {selectedSkill} &times;
        </span>
      ))}
    </div>
  );
};

const SelectInput = ({ props }: Props) => {
  return (
    <>
      <input
        onChange={(event) => {
          props.setQuery(event.target.value);
          props.setIsOpen(true);
        }}
        className={styles.select_input}
        type="text"
        placeholder="Select skills"
        value={props.query}
      />
      <span
        onClick={() => {
          props.setIsOpen(!props.isOpen);
        }}
        className={styles.select_icon}
      >
        <ArrowDownIcon />
      </span>
    </>
  );
};

const SelectList = ({ props }: Props) => {
  return (
    <ul
      className={`${styles.select_list} ${props.isOpen ? styles.visible : ""}`}
    >
      {props.filteredSkills.length > 0 ? (
        props.filteredSkills.map((skill: string, index: number) => (
          <li
            onClick={(event) => {
              event.stopPropagation();
              const skill = event.currentTarget.getAttribute("value");
              if (skill && !props.selectedSkills.includes(skill)) {
                props.setSelectedSkills([...props.selectedSkills, skill]);
              }
              props.setIsOpen(false);
              props.setQuery("");
            }}
            className={styles.list_item}
            key={index}
            value={skill}
          >
            {skill}
          </li>
        ))
      ) : (
        <li>No Results Found</li>
      )}
    </ul>
  );
};

interface Props {
  props: {
    filteredSkills: string[];
    isOpen: boolean;
    selectedSkills: string[];
    query: string;
    setSelectedSkills: (skills: string[]) => void;
    setIsOpen: (isOpen: boolean) => void;
    setQuery: (query: string) => void;
  };
}

export default SelectMenu;
