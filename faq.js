// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(button => {
    button.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item');
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close FAQ item when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.faq-item')) {
      // Optional: uncomment to close FAQ when clicking outside
      // document.querySelectorAll('.faq-item').forEach(item => {
      //   item.classList.remove('active');
      // });
    }
  });
});
