'use client';

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="container">
        <h2>Contact Me</h2>
        <p>Feel free to reach out for collaborations or just a friendly hello 👋</p>

        <form className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>

        <div className="contact-links">
          <p>Email: <a href="mailto:abdulsami.se786@gmail.com">abdulsami.se786@gmail.com</a></p>
          <p>GitHub: <a href="https://github.com/Abdul-Sami786" target="_blank">github.com/Abdul-Sami786</a></p>
          <p>LinkedIn: <a href="www.linkedin.com/in/abdul-sami-48663a378" target="_blank">linkedin.com/in/yourprofile</a></p>
        </div>
      </div>
    </section>
  );
}
