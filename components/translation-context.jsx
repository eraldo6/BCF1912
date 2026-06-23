"use client";

import React from "react";

export const TranslationContext = React.createContext({
  lang: "EN",
  t: (key) => key,
  setLang: () => {},
});

export const useTranslation = () => React.useContext(TranslationContext);
