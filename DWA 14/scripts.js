import { LitElement, css, html } from "https://cdn.skypack.dev/lit";
class TallyApp extends LitElement {
  static styles = css`
    :host {
      --color-green: #31C48D;
      --color-white: #FFFFFF;
      --color-dark-grey: #303036;
      --color-medium-grey: #4B4B56;
      --color-light-grey: #9A9EA4;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-family: Roboto, Arial, Helvetica, sans-serif;
      height: 100%;
      margin: 0;
      background-color: var(--color-medium-grey);
      color: var(--color-white);
    }
    .header {
      text-align: center;
    }
    .header__title {
      font-size: 3rem;
      font-weight: 900;
      color: var(--color-green);
    }
    .controls {
        background: var(--color-green);
    }
    .counter {
      background-color: var(--color-dark-grey);
    }
    .counter__value {
      width: 100%;
      height: 15rem;
      text-align: center;
      font-size: 6rem;
    //   font-weight: 900;
      background-color: var(--color-green);
      color: var(--color-dark-grey);
      border: none;
      border-bottom: 1px solid var(--color-light-grey);
    }
    .counter__actions {
      display: flex;
    }
    .counter__button {
     flex-grow: 1;
      background-color: transparent;
      border: none;
      color: var(--color-white);
      font-size: 3rem;
      height: 10rem;
      border-bottom: 1px solid var(--color-light-grey);
      transition: transform 0.3s;
      font-weight: bold;
      cursor: pointer;
    }
    .counter__button:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
    .counter__button:active {
      background-color: var(--color-medium-grey);
      transform: translateY(2%);
    }
    .counter__button_first {
      border-right: 1px solid var(--color-light-grey);
    }
    .counter_button {
      flex-grow: 1;
      background-color: transparent;
      border: none;
      color: var(--color-white);
      font-size: 3rem;
      height: 10rem;
      border-bottom: 1px solid var(--color-light-grey);
      transition: transform 0.3s;
      font-weight: bold;
      cursor: pointer;
    }
    .footer {
      background-color: var(--color-dark-grey);
      color: var(--color-light-grey);
      padding: 2rem;
      font-size: 0.8rem;
      text-align: center;
    }
    .footer__link {
      color: var(--color-green);
    }
  `;
  static properties = {
    count: { type: Number },
    state: { type: String },
  };
  constructor() {
    super();
    this.count = 0;
    this.state = 'Normal';
  }
  increment() {
    if (this.count < 20) {
      this.count++;
      if (this.count === 20) {
        this.state = 'Maximum Reached';
      }
    }
  }
  decrement() {
    if (this.count > -5) {
      this.count--;
      if (this.count === -5) {
        this.state = 'Minimum Reached';
      }
    }
  }
  render() {
    return html`
      <header class="header">
        <h1 class="header__title">Tally Count</h1>
      </header>
      <main class="counter">
        <input class="counter__value" data-key="number" readonly value="${this.count}" />
        <div class="counter__actions">
        <button
        data-key="subtract"
        class="counter_button counter_button_first"
        @click="${this.decrement}"
        ?disabled="${this.count === -5}"
      >
        -
      </button>
      <button
        data-key="add"
        class="counter__button"
        @click="${this.increment}"
        ?disabled="${this.count === 20}"
      >
        +
      </button>
    </div>
  </main>
  <footer class="footer">
    Inspired by
    <a class="footer__link" href="https://tallycount.app/">Tally Count</a>.
    Note that this is merely a practice project for learning JavaScript.
  </footer>
`;
}
}