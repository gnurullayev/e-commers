import { useState, FC } from "react";
import styles from "./LanguageDropdown.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { language } from "@/constants";

type LanguageType = {
  img: any;
  value: string;
  label: string;
};

interface IProps {
  isAuth: boolean;
}

const LanguageDropdown: FC<IProps> = ({ isAuth }) => {
  const { push, locale, asPath } = useRouter();
  const [activeLanguage, setActiveLanguage] = useState(
    language.find((el) => el.value === locale) || language[0]
  );
  const [active, setActive] = useState(false);

  const changeLanguage = (el: LanguageType) => {
    setActiveLanguage(el);
    setActive(false);
    push(asPath, asPath, { locale: el.value });
  };

  return (
    <div className={styles.language_container}>
      <button
        className={`${styles.language_btn} ${
          isAuth ? styles.language_btn_sm : styles.language_btn_lg
        }`}
        onClick={() => setActive((prev) => !prev)}
      >
        <div className={`${isAuth ? styles.flag_img_sm : styles.flag_img_lg}`}>
          <Image
            src={activeLanguage.img}
            alt={activeLanguage.value}
            fill={true}
          />
        </div>
        <span>{activeLanguage.label}</span>
      </button>

      <ul
        className={`${styles.language_list} ${
          isAuth ? styles.language_list_sm : styles.language_list_lg
        }`}
        style={{ display: active ? "block" : "none" }}
      >
        {language.map(
          (el) =>
            el.value !== activeLanguage.value && (
              <li
                className={`${styles.language_item} ${
                  isAuth ? styles.language_item_sm : styles.language_item_lg
                }`}
                key={el.value}
                onClick={() => changeLanguage(el)}
              >
                <Image src={el.img} alt={el.value} width={40} height={24} />
                <span>{el.label}</span>
              </li>
            )
        )}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
