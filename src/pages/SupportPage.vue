<template>
  <div class="support-page">
    <h1 class="crm-h1" style="margin-bottom:8px">Support</h1>
    <p style="color:var(--crm-text-secondary);margin-bottom:32px;font-size:16px">
      How can we help you today?
    </p>

    <!-- Search -->
    <div class="crm-card search-card">
      <div class="search-wrap">
        <q-icon name="search" size="22px" color="grey-5" />
        <input placeholder="Search for help articles..." class="crm-input" />
      </div>
    </div>

    <!-- FAQ sections -->
    <div class="faq-grid">
      <div
        v-for="section in faqSections"
        :key="section.title"
        class="crm-card faq-card"
      >
        <div class="faq-header">
          <q-icon :name="section.icon" size="24px" color="primary" />
          <span class="crm-h3">{{ section.title }}</span>
        </div>
        <div class="faq-items">
          <div
            v-for="item in section.items"
            :key="item"
            class="faq-item"
          >
            <q-icon name="arrow_forward_ios" size="12px" color="grey-5" />
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="crm-card contact-card">
      <h3 class="crm-h3" style="margin-bottom:16px">Contact Support</h3>
      <p style="color:var(--crm-text-secondary);font-size:14px;margin-bottom:20px">
        Can't find what you're looking for? Our support team is ready to help.
      </p>
      <div class="contact-row">
        <button class="btn-primary">
          <q-icon name="email" size="16px" style="margin-right:8px" />
          Email Support
        </button>
        <button class="btn-tertiary">
          <q-icon name="chat" size="16px" style="margin-right:8px" />
          Live Chat
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqSections = [
  {
    title: 'Getting Started',
    icon: 'rocket_launch',
    items: [
      'How to add a new client',
      'Setting up your dashboard',
      'Importing client data',
      'Understanding the Quick Analysis tool'
    ]
  },
  {
    title: 'Client Management',
    icon: 'people',
    items: [
      'Editing client profiles',
      'Recording trade history',
      'Setting client goals',
      'Generating client reports'
    ]
  },
  {
    title: 'Market Data',
    icon: 'trending_up',
    items: [
      'Understanding market summaries',
      'Setting up market alerts',
      'Integrating external data feeds',
      'Exporting market reports'
    ]
  },
  {
    title: 'Account & Billing',
    icon: 'manage_accounts',
    items: [
      'Changing your password',
      'Managing team members',
      'Subscription and billing',
      'Data export and privacy'
    ]
  }
]
</script>

<style lang="scss" scoped>
.support-page { max-width: 1200px; }

.search-card {
  padding: 20px 24px;
  margin-bottom: 24px;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
}

.crm-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  color: var(--crm-text);

  &::placeholder { color: #bbb; }
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 900px) { grid-template-columns: 1fr; }
}

.faq-card { overflow: hidden; }

.faq-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-bottom: 1px solid var(--crm-border);
  background: #fafafa;
}

.faq-items {
  padding: 12px 0;
}

.faq-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  font-size: 14px;
  color: var(--crm-text);
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: #fafafa;
    color: var(--crm-primary);
  }
}

.contact-card {
  padding: 28px;
}

.contact-row {
  display: flex;
  gap: 12px;
}
</style>
