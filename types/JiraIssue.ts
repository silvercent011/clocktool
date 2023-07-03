export interface JiraIsssue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: Fields;
}

export interface Fields {
  issuetype: Issuetype;
  subtasks: Subtask[];
  timetracking: Timetracking;
  status: Status;
}

export interface SubtaskFields {
  summary: string;
  status: Status;
  priority: Priority;
  issuetype: Issuetype;
}

export interface Issuetype {
  self: string;
  id: string;
  description: string;
  iconUrl: string;
  name: string;
  subtask: boolean;
  hierarchyLevel: number;
  avatarId?: number;
}

export interface Subtask {
  id: string;
  key: string;
  self: string;
  fields: SubtaskFields;
}

export interface Status {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: string;
  statusCategory: StatusCategory;
}

export interface StatusCategory {
  self: string;
  id: number;
  key: string;
  colorName: string;
  name: string;
}

export interface Priority {
  self: string;
  iconUrl: string;
  name: string;
  id: string;
}

export interface Timetracking {
  remainingEstimate?: string;
  timeSpent?: string;
  remainingEstimateSeconds?: number;
  timeSpentSeconds?: number;
}
