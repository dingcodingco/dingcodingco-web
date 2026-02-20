import { ActivityTemplate } from '@/types'

export const activityTemplates: ActivityTemplate[] = [
  {
    template: "{name}님이 [{track}] 트랙을 시작했어요",
    timeRange: "1-5분 전",
    weight: 0.3,
    names: ["김*민", "박*수", "이*영", "최*진", "정*희", "강*우", "윤*아", "송*호", "한*서"]
  },
  {
    template: "{name}님이 [{course}]를 완강했어요",
    timeRange: "3-10분 전",
    weight: 0.25,
    names: ["임*준", "조*민", "권*영", "배*수", "신*현", "오*지", "서*우"]
  },
  {
    template: "{name}님이 [{achievement}]를 달성했어요",
    timeRange: "5-30분 전",
    weight: 0.25,
    achievements: ["서비스 런칭", "취업 성공", "프리랜서 독립", "첫 프로젝트 완성", "면접 합격"],
    names: ["장*아", "홍*동", "노*경", "문*희", "양*철"]
  },
  {
    template: "{name}님이 평점 {rating}점을 남겼어요",
    timeRange: "10-60분 전",
    weight: 0.2,
    ratings: ["5.0", "5.0", "4.9", "5.0"],  // Weighted towards 5.0
    names: ["김*민", "박*수", "이*영", "최*진"]
  }
]
