export interface DashboardData {
  id: string
  isbn: string
  author: string
  price: number
  timestamp: Date
}

export interface DashboardDataProps {
  rows?: DashboardData[]
}

export interface DashboardDataMobile {
  info: DashboardData
}
