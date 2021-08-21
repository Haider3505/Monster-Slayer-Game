const getRandom = function (max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

const app = Vue.createApp({
  data() {
    return {
      pHealth: 100,
      mHealth: 100,
      cRound: 0,
      healing: 0, // that didn't working with local scope inside function that's why I created it here
      winner: null,
    };
  },
  watch: {
    pHealth(value) {
      if (value <= 0 && this.mHealth <= 0) this.winner = "draw";
      else if (value <= 0) this.winner = "monster";
    },
    mHealth(value) {
      if (value <= 0 && this.pHealth <= 0) this.winner = "draw";
      else if (value <= 0) this.winner = "player";
    },
  },
  computed: {
    mHealthBar() {
      if (this.mHealth < 0) return { width: "0%" };
      else
        return {
          width: this.mHealth + "%",
          backgroundColor: this.mHealth < 30 ? "red" : "green",
        };
    },
    pHealthBar() {
      if (this.pHealth < 0) return { width: "0%" };
      else
        return {
          width: this.pHealth + "%",
          backgroundColor: this.pHealth < 30 ? "red" : "green",
        };
    },
    toggleSattack() {
      return this.cRound % 3 !== 0 ? true : false;
    },
  },
  methods: {
    resetGame() {
      this.pHealth = 100;
      this.mHealth = 100;
      this.cRound = 0;
      this.winner = null;
    },
    attackMonster() {
      this.cRound++;
      // const attackValue = getRandom(12, 5); // Function is returning a value but it didn't get assigned
      this.mHealth -= getRandom(12, 5);
      this.attackPlayer();
      //   console.log(this.mHealth, this.pHealth);
    },
    attackPlayer() {
      //  const attackValue = getRandom(15, 8);

      this.pHealth -= getRandom(15, 8);
    },
    specialAttack() {
      this.cRound++;
      this.mHealth -= getRandom(25, 10);
      this.attackPlayer();
    },
    heal() {
      this.cRound++;
      this.healing = getRandom(15, 8);
      if (this.pHealth + this.healing > 100) this.pHealth = 100;
      else this.pHealth += this.healing;
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
  },
});

app.mount("#game");
