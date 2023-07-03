export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}

export interface AvatarUrls {
  "48x48": string;
  "24x24": string;
  "16x16": string;
  "32x32": string;
}

export interface Project {
  self: string;
  id: string;
  key: string;
  name: string;
  projectTypeKey: string;
  simplified: boolean;
  avatarUrls: AvatarUrls;
}

export interface Issuetype {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  avatarId?: number;
  hierarchyLevel: number;
  entityId?: string;
}

export interface Fields {
  summary: string;
  issuetype: Issuetype;
  project: Project;
  status: Status;
}

export interface JiraIssuesRequest {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
}

export interface Issue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: Fields;
}
