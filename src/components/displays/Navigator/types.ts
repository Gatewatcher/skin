export type NavId = string | number;

export type NavIdProps = {
  id?: NavId;
};

export type DefaultActiveItem =
  | { defaultSection?: undefined; defaultNavItem?: undefined }
  | { defaultSection: NavId; defaultNavItem: NavId };

export type CurrentActiveItem =
  | { currentSection?: undefined; currentNavItem?: undefined }
  | { currentSection: NavId; currentNavItem: NavId };
