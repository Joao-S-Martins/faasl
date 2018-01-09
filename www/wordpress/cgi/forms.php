<?php
  //SOURCE: http://blog.teamtreehouse.com/create-ajax-contact-form
  // Only process POST requests.
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["full_name"]));
    $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST['phone']);
    $phone = str_replace(array("\r","\n"),array(" "," "),$phone);
    $texting = strip_tags(trim($_POST['texting']);
    $texting = str_replace(array("\r","\n"),array(" "," "),$texting);
    $message = trim($_POST["message"]);
    $referer = $_SERVER['HTTP_REFERER'];

    // Check that data was sent to the mailer.
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
      // Set a 400 (bad request) response code and exit.
      http_response_code(400);
      echo "Oops! There was a problem with your submission. Please complete the form and try again.";
      exit;
    }

    // Set the recipient email address.
    $recipient = "info@faasl.org";

    // Set the email subject.
    $subject = "FAASL.org: Contact from $name using a form at $referer";

    // Build the email content.
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n";
    $email_content .= "Is OK to text: $texting\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers.
    $email_headers = "From: $name <$email>";

    // Send the email.
    if (mail($recipient, $subject, $email_content, $email_headers)) {
      // Set a 200 (okay) response code.
      http_response_code(200);
      echo "Thank You! Your message has been sent.";
    } else {
      // Set a 500 (internal server error) response code.
      http_response_code(500);
      echo "Oops! Something went wrong and we couldn't send your message.";
    }
  } else {
    // Not a POST request, set a 403 (forbidden) response code.
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
  }
?>
