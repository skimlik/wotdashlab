using System.Text.Json.Serialization;

namespace WotDashLab.Wot.Client.Contracts.WorldOfTanks.Accounts
{
    public class AccountStatistics
    {
        [JsonPropertyName("spotted")]
        public int Spotted { get; set; }

        [JsonPropertyName("battles_on_stunning_vehicles")]
        public int ButtlesOnStunningVehicles { get; set; }

        [JsonPropertyName("avg_damage_blocked")]
        public decimal AvgDamageBlocked { get; set; }

        [JsonPropertyName("direct_hits_received")]
        public int DirectHitsReceived { get; set; }

        [JsonPropertyName("explosion_hits")]
        public int ExplosionHits { get; set; }

        [JsonPropertyName("piercings_received")]
        public int PiercingReceived { get; set; }

        [JsonPropertyName("piercings")]
        public int Piercings { get; set; }

        [JsonPropertyName("xp")]
        public int Xp { get; set; }

        [JsonPropertyName("survived_battles")]
        public int SurvivedBattles { get; set; }

        [JsonPropertyName("dropped_capture_points")]
        public int DroppedCapturePoints { get; set; }

        [JsonPropertyName("hits_percents")]
        public int HitsPercents { get; set; }

        [JsonPropertyName("draws")]
        public int Draws { get; set; }

        [JsonPropertyName("max_xp_tank_id")]
        public int? MaxXpTankId { get; set; }

        [JsonPropertyName("battles")]
        public int Battles { get; set; }

        [JsonPropertyName("damage_received")]
        public int DamageReceived { get; set; }

        [JsonPropertyName("avg_damage_assisted")]
        public decimal AvgDamageAssisted { get; set; }

        [JsonPropertyName("max_frags_tank_id")]
        public int? MaxFragsTankId { get; set; }

        [JsonPropertyName("avg_damage_assisted_track")]
        public decimal AvgDamageAssistedTrack { get; set; }

        [JsonPropertyName("frags")]
        public int Frags { get; set; }

        [JsonPropertyName("stun_number")]
        public int StunNumber { get; set; }

        [JsonPropertyName("avg_damage_assisted_radio")]
        public decimal AvgDamageAssistedRatio { get; set; }

        [JsonPropertyName("capture_points")]
        public int CapturePoints { get; set; }

        [JsonPropertyName("stun_assisted_damage")]
        public int StunAssistedDamage { get; set; }

        [JsonPropertyName("max_damage")]
        public int MaxDamage { get; set; }

        [JsonPropertyName("hits")]
        public int Hits { get; set; }

        [JsonPropertyName("battle_avg_xp")]
        public decimal BattleAvgXp { get; set; }

        [JsonPropertyName("losses")]
        public int Losses { get; set; }

        [JsonPropertyName("wins")]
        public int Wins { get; set; }

        [JsonPropertyName("damage_dealt")]
        public int DamageDealt { get; set; }

        [JsonPropertyName("no_damage_direct_hits_received")]
        public int NoDamageDirectHitsReceived { get; set; }

        [JsonPropertyName("max_frags")]
        public int MaxFrags { get; set; }

        [JsonPropertyName("shots")]
        public int Shots { get; set; }

        [JsonPropertyName("explosion_hits_received")]
        public int ExplosionHitsReceived { get; set; }

        [JsonPropertyName("tanking_factor")]
        public decimal TankingFactor { get; set; }
    }
}
