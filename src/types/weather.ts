export type HazardType = 'tropical_cyclone' | 'heatwave' | 'extreme_rainfall' | 'cold_wave' | 'severe_wind';

export type AlertLevel = 'Watch' | 'Advisory' | 'Warning' | 'Severe Warning';

export type AlertLifecycleState = 'Created' | 'Updated' | 'Escalated' | 'Stabilised' | 'Downgraded' | 'Resolved';

export type UserRole = 'meteorologist' | 'ndrf' | 'district_admin' | 'agriculture' | 'public';

export interface TrajectoryPoint {
  lead_h: number;
  time: string;
  lat: number;
  lon: number;
  intensity_mslp: number; // hPa
  max_wind_kmh: number;   // km/h
  cone_radius_km: number; // 67% cone radius
  cone_90_radius_km: number; // 90% cone radius
  spread_km: number;
}

export interface EnsembleMemberTrack {
  member_id: number;
  is_lagged: boolean; // 11 lagged from 12Z, 11 current 00Z, 1 control
  is_control: boolean;
  color: string;
  points: { lead_h: number; lat: number; lon: number; intensity_wind: number }[];
}

export interface HistoricalAnalogue {
  event_name: string;
  year: number;
  similarity_score: number; // 0 - 1
  observed_impact: string;
  max_wind_kmh: number;
  min_mslp_hpa: number;
  landfall_location: string;
}

export interface DistrictExposure {
  id: string;
  name: string;
  state: string;
  population: number;
  hospitals: number;
  shelters: number;
  critical_roads_km: number;
  calibrated_p: number; // 0 - 1
  risk_level: 'Low' | 'Moderate' | 'High' | 'Very High';
  key_crop: string;
  crop_stage: string;
  crop_vulnerability: string;
}

export interface ForecastDelta {
  vs_cycle: string;
  current_cycle: string;
  track_shift_km: number;
  bearing_deg: number;
  bearing_cardinal: string;
  delta_peak_wind_kmh: number;
  delta_median_wind_kmh: number;
  delta_arrival_hours: number;
  probability_change_percent: number;
  area_change_sqkm: number;
  is_statistically_significant: boolean;
  computed_narrative: string;
}

export interface PhysicsConsistencyMetrics {
  mass_conservation_score: number; // % close to 100%
  non_negativity_satisfied: boolean;
  humidity_bound_satisfied: boolean;
  lapse_rate_k_per_km: number; // ~ -6.5 K/km
  upslope_orographic_correlation: number;
  sample_variance_flag: 'Normal' | 'Elevated' | 'Out-of-Distribution';
}

export interface ExtremeEvent {
  id: string;
  name: string;
  hazard_type: HazardType;
  category_label: string;
  first_seen_cycle: string;
  current_cycle: string;
  status: 'Active' | 'Monitoring' | 'Dissipated';
  severity_tier: 'Normal' | 'Moderate' | 'Significant' | 'Extreme' | 'Catastrophic';
  current_lat: number;
  current_lon: number;
  current_mslp_hpa: number;
  current_wind_kmh: number;
  peak_forecast_wind_kmh: number;
  arrival_window: string;
  landfall_location: string;
  
  // Ensemble properties
  total_members: number;
  agreeing_members: number; // e.g. 21 / 23
  member_agreement_percent: number;
  calibrated_probability: number; // calibrated P
  efi_value: number; // Extreme Forecast Index [-1, +1]
  climatological_percentile: number; // e.g. 99.8
  return_period_years: number; // e.g. 65 years
  
  // Trajectory & Ensemble
  trajectory: TrajectoryPoint[];
  ensemble_members: EnsembleMemberTrack[];
  
  // Downscaling & Physics
  downscaling: {
    coarse_res_km: number; // 12 km NEPS-G
    fine_res_km: number;   // 5 km Residual Diffusion
    status: 'Computed' | 'Refining';
    physics_metrics: PhysicsConsistencyMetrics;
    power_spectrum_preservation: number; // 96%
  };

  // Forecast Delta (A/B)
  forecast_delta: ForecastDelta;

  // Why this alert
  why_this_alert: {
    anomaly_summary: string;
    synoptic_drivers: string[];
    persistence_hours: number;
    terrain_influence_percent: number;
    analogues: HistoricalAnalogue[];
  };

  // Impact and Exposure
  affected_districts: DistrictExposure[];
  total_population_at_risk: number;

  // Alert Lifecycle & Governance
  alert: {
    id: string;
    level: AlertLevel;
    state: AlertLifecycleState;
    recommended_level: AlertLevel;
    last_updated: string;
    meteorologist_notes: string;
    approved_by: string | null;
    approved_at: string | null;
  };
}
