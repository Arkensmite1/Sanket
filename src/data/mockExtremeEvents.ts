import { ExtremeEvent } from '../types/weather';

export const mockEvents: ExtremeEvent[] = [
  {
    id: 'EVT-2026-0001',
    name: 'Super Cyclonic Storm Amphan',
    hazard_type: 'tropical_cyclone',
    category_label: 'Category 5 Equivalent (Super Cyclone)',
    first_seen_cycle: '2026-05-15 00:00 UTC',
    current_cycle: '2026-05-18 12:00 UTC',
    status: 'Active',
    severity_tier: 'Catastrophic',
    current_lat: 16.2,
    current_lon: 86.8,
    current_mslp_hpa: 920,
    current_wind_kmh: 235,
    peak_forecast_wind_kmh: 255,
    arrival_window: 'May 20, 14:00 - 18:00 UTC',
    landfall_location: 'Sundarbans / Sagar Island, West Bengal',
    
    total_members: 23,
    agreeing_members: 21,
    member_agreement_percent: 91.3,
    calibrated_probability: 0.88,
    efi_value: 0.94,
    climatological_percentile: 99.9,
    return_period_years: 75,
    
    trajectory: [
      { lead_h: 0, time: 'May 18, 12:00 UTC', lat: 16.2, lon: 86.8, intensity_mslp: 920, max_wind_kmh: 235, cone_radius_km: 25, cone_90_radius_km: 40, spread_km: 18 },
      { lead_h: 12, time: 'May 19, 00:00 UTC', lat: 17.8, lon: 87.2, intensity_mslp: 925, max_wind_kmh: 220, cone_radius_km: 48, cone_90_radius_km: 75, spread_km: 32 },
      { lead_h: 24, time: 'May 19, 12:00 UTC', lat: 19.5, lon: 87.7, intensity_mslp: 932, max_wind_kmh: 205, cone_radius_km: 72, cone_90_radius_km: 110, spread_km: 54 },
      { lead_h: 36, time: 'May 20, 00:00 UTC', lat: 20.9, lon: 88.1, intensity_mslp: 940, max_wind_kmh: 185, cone_radius_km: 96, cone_90_radius_km: 145, spread_km: 70 },
      { lead_h: 48, time: 'May 20, 12:00 UTC (Landfall)', lat: 21.8, lon: 88.4, intensity_mslp: 950, max_wind_kmh: 165, cone_radius_km: 120, cone_90_radius_km: 180, spread_km: 88 },
      { lead_h: 60, time: 'May 21, 00:00 UTC', lat: 23.2, lon: 88.8, intensity_mslp: 978, max_wind_kmh: 105, cone_radius_km: 155, cone_90_radius_km: 230, spread_km: 115 },
      { lead_h: 72, time: 'May 21, 12:00 UTC', lat: 24.8, lon: 89.4, intensity_mslp: 994, max_wind_kmh: 65, cone_radius_km: 195, cone_90_radius_km: 290, spread_km: 145 },
    ],

    ensemble_members: Array.from({ length: 23 }).map((_, i) => {
      const isControl = i === 0;
      const isLagged = i > 11;
      // Per-member perturbations
      const latJitter = (Math.sin(i * 1.7) * 0.45) + (isLagged ? -0.2 : 0.15);
      const lonJitter = (Math.cos(i * 2.1) * 0.55) + (isLagged ? 0.3 : -0.1);
      const windJitter = (Math.sin(i * 3.3) * 18);

      return {
        member_id: i + 1,
        is_lagged: isLagged,
        is_control: isControl,
        color: isControl ? '#ef4444' : isLagged ? '#f59e0b' : '#3b82f6',
        points: [
          { lead_h: 0, lat: 16.2, lon: 86.8, intensity_wind: 235 },
          { lead_h: 12, lat: 17.8 + latJitter * 0.3, lon: 87.2 + lonJitter * 0.3, intensity_wind: 220 + windJitter * 0.5 },
          { lead_h: 24, lat: 19.5 + latJitter * 0.6, lon: 87.7 + lonJitter * 0.6, intensity_wind: 205 + windJitter * 0.8 },
          { lead_h: 36, lat: 20.9 + latJitter * 0.9, lon: 88.1 + lonJitter * 0.9, intensity_wind: 185 + windJitter },
          { lead_h: 48, lat: 21.8 + latJitter * 1.2, lon: 88.4 + lonJitter * 1.2, intensity_wind: 165 + windJitter * 1.1 },
          { lead_h: 60, lat: 23.2 + latJitter * 1.6, lon: 88.8 + lonJitter * 1.5, intensity_wind: 105 + windJitter * 0.7 },
          { lead_h: 72, lat: 24.8 + latJitter * 2.1, lon: 89.4 + lonJitter * 1.9, intensity_wind: 65 + windJitter * 0.5 },
        ]
      };
    }),

    downscaling: {
      coarse_res_km: 12,
      fine_res_km: 5,
      status: 'Computed',
      physics_metrics: {
        mass_conservation_score: 99.4,
        non_negativity_satisfied: true,
        humidity_bound_satisfied: true,
        lapse_rate_k_per_km: -6.4,
        upslope_orographic_correlation: 0.82,
        sample_variance_flag: 'Normal'
      },
      power_spectrum_preservation: 96.2
    },

    forecast_delta: {
      vs_cycle: '2026-05-18 00:00 UTC',
      current_cycle: '2026-05-18 12:00 UTC',
      track_shift_km: 46.2,
      bearing_deg: 32,
      bearing_cardinal: 'NNE',
      delta_peak_wind_kmh: 15,
      delta_median_wind_kmh: 8.5,
      delta_arrival_hours: -3.5, // 3.5 hours earlier
      probability_change_percent: 14.5,
      area_change_sqkm: 1850,
      is_statistically_significant: true,
      computed_narrative: 'Corridor centroid at +48 h moved 46.2 km toward bearing 032° (NNE shift toward Sundarbans). Landfall timing advanced by 3.5 hours. Exceedance probability for gust > 160 km/h increased by +14.5% to 88% due to tightening cross-member consensus. Shift exceeds natural cycle jitter threshold (40 km / 5 m/s).'
    },

    why_this_alert: {
      anomaly_summary: 'Extreme deep core pressure (920 hPa) exceeds 99.9th climatological percentile for Bay of Bengal pre-monsoon systems. 21 of 23 weighted NEPS-G members exceed cyclone threshold.',
      synoptic_drivers: [
        'Sea Surface Temperature (SST) anomaly of +1.8°C to +2.1°C across central Bay of Bengal.',
        'High Integrated Vapor Transport (IVT > 1150 kg/m/s) supplying continuous moisture convergence.',
        'Low vertical wind shear (< 10 knots) enabling sustained Category 5 symmetry.'
      ],
      persistence_hours: 48,
      terrain_influence_percent: 18,
      analogues: [
        {
          event_name: 'Very Severe Cyclonic Storm Fani',
          year: 2019,
          similarity_score: 0.89,
          observed_impact: 'Puri landfall, extensive grid damage, 1.4M evacuations saved lives.',
          max_wind_kmh: 215,
          min_mslp_hpa: 932,
          landfall_location: 'Odisha Coast'
        },
        {
          event_name: 'Super Cyclonic Storm 05B',
          year: 1999,
          similarity_score: 0.85,
          observed_impact: 'Massive surge inundation across Paradip and coastal Jagatsinghpur.',
          max_wind_kmh: 260,
          min_mslp_hpa: 912,
          landfall_location: 'Paradip, Odisha'
        },
        {
          event_name: 'Extremely Severe Cyclonic Storm Phailin',
          year: 2013,
          similarity_score: 0.82,
          observed_impact: 'Gopalpur landfall, heavy agricultural swath loss in Ganjam.',
          max_wind_kmh: 215,
          min_mslp_hpa: 940,
          landfall_location: 'Gopalpur, Odisha'
        }
      ]
    },

    affected_districts: [
      {
        id: 'dist-01',
        name: 'South 24 Parganas',
        state: 'West Bengal',
        population: 8161961,
        hospitals: 42,
        shelters: 312,
        critical_roads_km: 410,
        calibrated_p: 0.94,
        risk_level: 'Very High',
        key_crop: 'Boro Rice / Betel Vine',
        crop_stage: 'Harvesting / Maturity',
        crop_vulnerability: 'Catastrophic wind stripping & saline surge breach'
      },
      {
        id: 'dist-02',
        name: 'North 24 Parganas',
        state: 'West Bengal',
        population: 10009781,
        hospitals: 68,
        shelters: 245,
        critical_roads_km: 580,
        calibrated_p: 0.91,
        risk_level: 'Very High',
        key_crop: 'Jute & Vegetables',
        crop_stage: 'Vegetative Growth',
        crop_vulnerability: 'Severe waterlogging & stem lodging'
      },
      {
        id: 'dist-03',
        name: 'East Medinipur (Digha/Contai)',
        state: 'West Bengal',
        population: 5095875,
        hospitals: 34,
        shelters: 198,
        critical_roads_km: 340,
        calibrated_p: 0.87,
        risk_level: 'High',
        key_crop: 'Marine Fisheries & Paddy',
        crop_stage: 'Nursery / Transplanting',
        crop_vulnerability: 'High coastal embankment breach hazard'
      },
      {
        id: 'dist-04',
        name: 'Kolkata Metropolitan',
        state: 'West Bengal',
        population: 4496694,
        hospitals: 110,
        shelters: 140,
        critical_roads_km: 820,
        calibrated_p: 0.82,
        risk_level: 'High',
        key_crop: 'Urban Infrastructure / Power Grid',
        crop_stage: 'N/A',
        crop_vulnerability: 'Uprooted heavy tree canopy and transformer flashovers'
      },
      {
        id: 'dist-05',
        name: 'Balasore',
        state: 'Odisha',
        population: 2320529,
        hospitals: 26,
        shelters: 185,
        critical_roads_km: 290,
        calibrated_p: 0.74,
        risk_level: 'Moderate',
        key_crop: 'Paddy & Coconut',
        crop_stage: 'Flowering',
        crop_vulnerability: 'Gale wind damage along NH-16 corridor'
      }
    ],

    total_population_at_risk: 30084840,

    alert: {
      id: 'ALT-2026-WB-004',
      level: 'Severe Warning',
      state: 'Escalated',
      recommended_level: 'Severe Warning',
      last_updated: '2026-05-18 12:45 UTC',
      meteorologist_notes: 'NEPS-G 12Z cycle indicates tight cross-member consensus with eastward track shift toward Sundarbans. Residual diffusion model highlights 5 km eyewall gust peak > 210 km/h in coastal blocks. Immediate NDRF pre-positioning and coastal evacuation advised.',
      approved_by: 'Dr. R. Sengupta (Chief Forecaster, Regional Met Centre)',
      approved_at: '2026-05-18 13:00 UTC'
    }
  },

  {
    id: 'EVT-2026-0042',
    name: 'Indo-Gangetic Severe Heat Dome',
    hazard_type: 'heatwave',
    category_label: 'Severe Heatwave with Wet-Bulb Hazard',
    first_seen_cycle: '2026-06-02 00:00 UTC',
    current_cycle: '2026-06-04 06:00 UTC',
    status: 'Active',
    severity_tier: 'Extreme',
    current_lat: 28.6,
    current_lon: 77.2,
    current_mslp_hpa: 1002,
    current_wind_kmh: 18,
    peak_forecast_wind_kmh: 28,
    arrival_window: 'June 4 - June 9 (Ongoing Peak)',
    landfall_location: 'Delhi-NCR, Haryana, West Rajasthan, Central UP',

    total_members: 23,
    agreeing_members: 22,
    member_agreement_percent: 95.6,
    calibrated_probability: 0.92,
    efi_value: 0.96,
    climatological_percentile: 99.7,
    return_period_years: 40,

    trajectory: [
      { lead_h: 0, time: 'Jun 04, 06:00 UTC', lat: 28.6, lon: 77.2, intensity_mslp: 1002, max_wind_kmh: 18, cone_radius_km: 120, cone_90_radius_km: 180, spread_km: 30 },
      { lead_h: 24, time: 'Jun 05, 06:00 UTC', lat: 28.9, lon: 76.8, intensity_mslp: 1001, max_wind_kmh: 20, cone_radius_km: 140, cone_90_radius_km: 210, spread_km: 35 },
      { lead_h: 48, time: 'Jun 06, 06:00 UTC', lat: 29.2, lon: 76.5, intensity_mslp: 1000, max_wind_kmh: 22, cone_radius_km: 160, cone_90_radius_km: 240, spread_km: 42 },
      { lead_h: 72, time: 'Jun 07, 06:00 UTC', lat: 28.8, lon: 77.4, intensity_mslp: 1002, max_wind_kmh: 19, cone_radius_km: 180, cone_90_radius_km: 270, spread_km: 50 },
    ],

    ensemble_members: Array.from({ length: 23 }).map((_, i) => ({
      member_id: i + 1,
      is_lagged: i > 11,
      is_control: i === 0,
      color: i === 0 ? '#ef4444' : i > 11 ? '#f59e0b' : '#3b82f6',
      points: [
        { lead_h: 0, lat: 28.6, lon: 77.2, intensity_wind: 18 },
        { lead_h: 24, lat: 28.9 + (Math.sin(i) * 0.4), lon: 76.8 + (Math.cos(i) * 0.5), intensity_wind: 20 },
        { lead_h: 48, lat: 29.2 + (Math.sin(i) * 0.6), lon: 76.5 + (Math.cos(i) * 0.7), intensity_wind: 22 },
        { lead_h: 72, lat: 28.8 + (Math.sin(i) * 0.8), lon: 77.4 + (Math.cos(i) * 0.8), intensity_wind: 19 },
      ]
    })),

    downscaling: {
      coarse_res_km: 12,
      fine_res_km: 5,
      status: 'Computed',
      physics_metrics: {
        mass_conservation_score: 99.8,
        non_negativity_satisfied: true,
        humidity_bound_satisfied: true,
        lapse_rate_k_per_km: -6.8,
        upslope_orographic_correlation: 0.45,
        sample_variance_flag: 'Normal'
      },
      power_spectrum_preservation: 97.5
    },

    forecast_delta: {
      vs_cycle: '2026-06-03 18:00 UTC',
      current_cycle: '2026-06-04 06:00 UTC',
      track_shift_km: 18.5,
      bearing_deg: 310,
      bearing_cardinal: 'NW',
      delta_peak_wind_kmh: 0,
      delta_median_wind_kmh: 0,
      delta_arrival_hours: 0,
      probability_change_percent: 5.2,
      area_change_sqkm: 6400,
      is_statistically_significant: true,
      computed_narrative: 'High-pressure ridge centroid stabilized over Haryana/Rajasthan border. 5 km downscaled T2m maximum reaches 47.8°C with wet-bulb index exceeding 32.5°C in dense urban clusters. Persistence extended by +24 hours.'
    },

    why_this_alert: {
      anomaly_summary: 'T2m anomaly +5.8°C above 1991-2020 climatology. Anticyclonic blocking ridge at Z500 preventing moisture ventilation. 22 of 23 members exceed severe heatwave criteria.',
      synoptic_drivers: [
        'Persistent 500 hPa geopotential height anomaly (Z500 > 5880 gpm) causing intense adiabatic descent.',
        'Dry, hot westerly winds from the Thar Desert with minimal nocturnal radiative cooling.',
        'Elevated urban heat island index amplifying nighttime minimum temperatures > 34°C.'
      ],
      persistence_hours: 96,
      terrain_influence_percent: 8,
      analogues: [
        {
          event_name: 'North India Historic Heatwave',
          year: 2024,
          similarity_score: 0.94,
          observed_impact: 'Record 49.9°C at Mungeshpur, critical peak power grid demand spikes.',
          max_wind_kmh: 30,
          min_mslp_hpa: 1000,
          landfall_location: 'Delhi-NCR & Rajasthan'
        },
        {
          event_name: 'Pre-Monsoon Heatwave',
          year: 2022,
          similarity_score: 0.91,
          observed_impact: 'Early March-April wheat shriveling, widespread agricultural yield drops.',
          max_wind_kmh: 25,
          min_mslp_hpa: 1004,
          landfall_location: 'Punjab, Haryana & UP'
        }
      ]
    },

    affected_districts: [
      {
        id: 'dist-11',
        name: 'New Delhi & NCR',
        state: 'Delhi',
        population: 18900000,
        hospitals: 145,
        shelters: 80,
        critical_roads_km: 1200,
        calibrated_p: 0.96,
        risk_level: 'Very High',
        key_crop: 'Urban Construction & Labor',
        crop_stage: 'Peak Exposure',
        crop_vulnerability: 'Severe heat stroke risk for outdoor workers'
      },
      {
        id: 'dist-12',
        name: 'Churu & Bikaner',
        state: 'Rajasthan',
        population: 4300000,
        hospitals: 32,
        shelters: 40,
        critical_roads_km: 650,
        calibrated_p: 0.94,
        risk_level: 'Very High',
        key_crop: 'Millets / Livestock',
        crop_stage: 'Summer Fallow',
        crop_vulnerability: 'Livestock dehydration & fodder heat stress'
      }
    ],

    total_population_at_risk: 42500000,

    alert: {
      id: 'ALT-2026-DEL-009',
      level: 'Severe Warning',
      state: 'Updated',
      recommended_level: 'Severe Warning',
      last_updated: '2026-06-04 07:15 UTC',
      meteorologist_notes: 'Red alert maintained. Maximum daytime temperatures 46-48°C. Wet-bulb Globe Temperature hazardous for unconditioned populations. Urban water replenishment protocols should remain active.',
      approved_by: 'IMD National Weather Forecasting Centre',
      approved_at: '2026-06-04 07:30 UTC'
    }
  },

  {
    id: 'EVT-2026-0089',
    name: 'Western Ghats Orographic Extreme Deluge',
    hazard_type: 'extreme_rainfall',
    category_label: 'Atmospheric River & Landslide Inundation',
    first_seen_cycle: '2026-07-28 00:00 UTC',
    current_cycle: '2026-07-30 00:00 UTC',
    status: 'Active',
    severity_tier: 'Extreme',
    current_lat: 11.6,
    current_lon: 76.1,
    current_mslp_hpa: 998,
    current_wind_kmh: 55,
    peak_forecast_wind_kmh: 75,
    arrival_window: 'July 30 - August 02',
    landfall_location: 'Wayanad, Idukki & Nilgiris Escarpment',

    total_members: 23,
    agreeing_members: 20,
    member_agreement_percent: 87.0,
    calibrated_probability: 0.86,
    efi_value: 0.92,
    climatological_percentile: 99.8,
    return_period_years: 55,

    trajectory: [
      { lead_h: 0, time: 'Jul 30, 00:00 UTC', lat: 11.6, lon: 76.1, intensity_mslp: 998, max_wind_kmh: 55, cone_radius_km: 30, cone_90_radius_km: 50, spread_km: 20 },
      { lead_h: 24, time: 'Jul 31, 00:00 UTC', lat: 11.7, lon: 76.2, intensity_mslp: 996, max_wind_kmh: 60, cone_radius_km: 45, cone_90_radius_km: 70, spread_km: 30 },
      { lead_h: 48, time: 'Aug 01, 00:00 UTC', lat: 11.8, lon: 76.3, intensity_mslp: 997, max_wind_kmh: 58, cone_radius_km: 60, cone_90_radius_km: 90, spread_km: 40 },
    ],

    ensemble_members: Array.from({ length: 23 }).map((_, i) => ({
      member_id: i + 1,
      is_lagged: i > 11,
      is_control: i === 0,
      color: i === 0 ? '#ef4444' : i > 11 ? '#f59e0b' : '#3b82f6',
      points: [
        { lead_h: 0, lat: 11.6, lon: 76.1, intensity_wind: 55 },
        { lead_h: 24, lat: 11.7 + (Math.sin(i * 2) * 0.15), lon: 76.2 + (Math.cos(i * 2) * 0.15), intensity_wind: 60 },
        { lead_h: 48, lat: 11.8 + (Math.sin(i * 2.5) * 0.25), lon: 76.3 + (Math.cos(i * 2.5) * 0.25), intensity_wind: 58 },
      ]
    })),

    downscaling: {
      coarse_res_km: 12,
      fine_res_km: 5,
      status: 'Computed',
      physics_metrics: {
        mass_conservation_score: 98.9,
        non_negativity_satisfied: true,
        humidity_bound_satisfied: true,
        lapse_rate_k_per_km: -6.2,
        upslope_orographic_correlation: 0.91, // very high orographic upslope
        sample_variance_flag: 'Normal'
      },
      power_spectrum_preservation: 95.8
    },

    forecast_delta: {
      vs_cycle: '2026-07-29 12:00 UTC',
      current_cycle: '2026-07-30 00:00 UTC',
      track_shift_km: 14.0,
      bearing_deg: 85,
      bearing_cardinal: 'E',
      delta_peak_wind_kmh: 5,
      delta_median_wind_kmh: 2,
      delta_arrival_hours: -2,
      probability_change_percent: 8.4,
      area_change_sqkm: 950,
      is_statistically_significant: true,
      computed_narrative: 'Orographic precipitation plume concentrated over Wayanad steep slope catchment (+320 mm / 24h). High moisture convergence index IVT > 1050 kg/m/s sustained across Arabian Sea inflow.'
    },

    why_this_alert: {
      anomaly_summary: '24-hour rainfall totals exceeding 320 mm across high relief ghats. Exceeds 99.8th percentile for mid-monsoon. Soil saturation index already at 94%.',
      synoptic_drivers: [
        'Strong Arabian Sea low-level jet (LLJ 850 hPa winds > 45 knots) impinging perpendicular to Western Ghats.',
        'High moisture convergence with IVT > 1050 kg/m/s.',
        'Deep saturated tropospheric column with precipitable water > 68 mm.'
      ],
      persistence_hours: 48,
      terrain_influence_percent: 42,
      analogues: [
        {
          event_name: 'Kerala Deluge & Landslides',
          year: 2018,
          similarity_score: 0.92,
          observed_impact: 'Dam gates opened simultaneously, major river overflow, widespread relief ops.',
          max_wind_kmh: 70,
          min_mslp_hpa: 994,
          landfall_location: 'Central & North Kerala'
        }
      ]
    },

    affected_districts: [
      {
        id: 'dist-21',
        name: 'Wayanad (Meppadi / Chooralmala)',
        state: 'Kerala',
        population: 817420,
        hospitals: 18,
        shelters: 65,
        critical_roads_km: 140,
        calibrated_p: 0.93,
        risk_level: 'Very High',
        key_crop: 'Tea / Cardamom / Coffee',
        crop_stage: 'Plucking / Ripening',
        crop_vulnerability: 'Topsoil wash-off and debris flow in plantation slopes'
      },
      {
        id: 'dist-22',
        name: 'Idukki Catchment',
        state: 'Kerala',
        population: 1108974,
        hospitals: 24,
        shelters: 85,
        critical_roads_km: 210,
        calibrated_p: 0.89,
        risk_level: 'Very High',
        key_crop: 'Pepper & Spices',
        crop_stage: 'Vegetative',
        crop_vulnerability: 'Reservoir inflow spike requiring emergency spillway discharge'
      }
    ],

    total_population_at_risk: 3450000,

    alert: {
      id: 'ALT-2026-KER-014',
      level: 'Warning',
      state: 'Escalated',
      recommended_level: 'Severe Warning',
      last_updated: '2026-07-30 01:15 UTC',
      meteorologist_notes: '5 km downscaled accumulation signals extreme local enhancement in valley heads. Recommending escalation to Severe Warning for SDMA and NDRF hill team deployment.',
      approved_by: 'State Disaster Management Authority (SDMA)',
      approved_at: '2026-07-30 01:45 UTC'
    }
  }
];
