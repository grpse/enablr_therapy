import { z } from 'zod';

const generateAvailabilityFrom = (
  startDate = new Date(),
): Array<{
  start: Date;
  end: Date;
  id: string;
  available: boolean;
}> => {
  const date = new Date(startDate);
  return Array.from({ length: 10 }).map((slot, index) => {
    if (Math.random() > 0.5) {
      date.setHours(date.getHours() + 24);
    } else {
      date.setHours(date.getHours() + 2);
    }
    const end = new Date(date);
    end.setHours(end.getHours() + 0.5);
    return {
      start: new Date(date),
      end,
      id: String(date.getTime()),
      available: true,
    };
  });
};

export enum EServices {
  MASSAGE_THERAPY = 'massage-therapy',
  BEHAVIOR_THERAPY = 'behavior-therapy',
}

export enum EMassageTherapyReasonsForVisit {
  SWEDISH_MASSAGE = 'swedish-massage',
  SPORTS_MASSAGE = 'sports-massage',
  TRIGGER_POINT_MASSAGE = 'trigger-point-massage',
  MYOFASCIAL_RELEASE = 'myofascial-release',
  STRUCTURAL_INTEGRATION = 'structural-integration',
  TRAUMA_TOUCH_THERAPY = 'trauma-touch-therapy',
  PRENATAL = 'prenatal',
  MANUAL_LYMPHATIC_DRAINAGE = 'manual-lymphatic-drainage',
  CRANIOSACRAL = 'craniosacral',
  NEUROMUSCULAR = 'neuromuscular',
  CUPPING = 'cupping',
  DEEP_TISSUE_MASSAGE = 'deep-tissue-massage',
  THAI_MASSAGE = 'thai-massage',
  HOT_STONE_MASSAGE = 'hot-stone-massage',
}

export enum EBehaviorTherapyReasonsForVisit {
  FUNCTIONAL_BEHAVIORAL_ASSESSMENT = 'functional-behavioral-assessment',
  BEHAVIORAL_INTELLIGENCE_PLAN = 'behavioral-intelligence-plan',
  ABA_THERAPY = 'aba-therapy',
  PARENT_CONSULTATION = 'parent-consultation',
}

const REASONS_BY_SERVICE = [
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.SWEDISH_MASSAGE,
    name: 'Swedish Massage',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.SPORTS_MASSAGE,
    name: 'Sports Massage',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.TRIGGER_POINT_MASSAGE,
    name: 'Trigger Point Massage',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.MYOFASCIAL_RELEASE,
    name: 'Myofascial Release',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.STRUCTURAL_INTEGRATION,
    name: 'Structural Integration',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.TRAUMA_TOUCH_THERAPY,
    name: 'Trauma Touch Therapy',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.PRENATAL,
    name: 'Prenatal',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.MANUAL_LYMPHATIC_DRAINAGE,
    name: 'Manual Lymphatic Drainage',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.CRANIOSACRAL,
    name: 'Craniosacral',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.NEUROMUSCULAR,
    name: 'Neuromuscular',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.CUPPING,
    name: 'Cupping',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.DEEP_TISSUE_MASSAGE,
    name: 'Deep Tissue Massage',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.THAI_MASSAGE,
    name: 'Thai Massage',
  },
  {
    service: EServices.MASSAGE_THERAPY,
    id: EMassageTherapyReasonsForVisit.HOT_STONE_MASSAGE,
    name: 'Hot Stone Massage',
  },
  {
    service: EServices.BEHAVIOR_THERAPY,
    id: EBehaviorTherapyReasonsForVisit.FUNCTIONAL_BEHAVIORAL_ASSESSMENT,
    name: 'Functional Behavioral Assessment',
  },
  {
    service: EServices.BEHAVIOR_THERAPY,
    id: EBehaviorTherapyReasonsForVisit.BEHAVIORAL_INTELLIGENCE_PLAN,
    name: 'Behavioral Intelligence Plan',
  },
  {
    service: EServices.BEHAVIOR_THERAPY,
    id: EBehaviorTherapyReasonsForVisit.ABA_THERAPY,
    name: 'ABA Therapy',
  },
  {
    service: EServices.BEHAVIOR_THERAPY,
    id: EBehaviorTherapyReasonsForVisit.PARENT_CONSULTATION,
    name: 'Parent Consultation',
  },
];

export enum ELocations {
  ON_PROVIDER_LOCATION = 'on-provider-location',
  ON_MY_LOCATION = 'on-my-location',
  ON_VIDEO_CALL = 'on-video-call',
}

const reasonSchema = z.object({
  service: z.nativeEnum(EServices),
  id: z
    .nativeEnum(EMassageTherapyReasonsForVisit)
    .or(z.nativeEnum(EBehaviorTherapyReasonsForVisit)),
  name: z.string(),
});

const calendarEntrySchema = z.object({
  start: z.date(),
  end: z.date(),
  id: z.string(),
  available: z.boolean().optional(),
});

const availabilitySchema = z.object({
  services: z.array(
    z.object({
      id: z.nativeEnum(EServices),
      name: z.string(),
    }),
  ),
  reasonsByService: z.array(reasonSchema),
  locations: z.array(
    z.object({
      id: z.nativeEnum(ELocations),
      name: z.string(),
    }),
  ),
  calendar: z.array(calendarEntrySchema),
});

export type TAvailabilityData = z.infer<typeof availabilitySchema>;

export const CONFIG_RESPONSE = {
  services: [
    {
      id: EServices.BEHAVIOR_THERAPY,
      name: 'Behavior therapy',
    },
    {
      id: EServices.MASSAGE_THERAPY,
      name: 'Massage therapy',
    },
  ],
  reasonsByService: REASONS_BY_SERVICE,
  locations: [
    {
      id: ELocations.ON_PROVIDER_LOCATION,
      name: "On provider's location",
    },
    {
      id: ELocations.ON_MY_LOCATION,
      name: 'On my location',
    },
    {
      id: ELocations.ON_VIDEO_CALL,
      name: 'On video call',
    },
  ],
  calendar: generateAvailabilityFrom(),
};
