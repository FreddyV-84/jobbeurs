<?php
$naam=$_POST['naam'];
$email=$_POST['email'];
$bedrijfNaam=$_POST['bedrijfNaam'];
$tel=$_POST['tel'];
$berichtFrm=$_POST['berichtFrm'];
$headers = 'From: '.$email."\r\n".
 //$email_to = "olifirenko88@gmail.com";
$email_to = "philipsenwout@outlook.com";
$email_subject = "Contact van ".$naam;
$tekst="Naam: ".$naam."\nE-mail: ".$email."\nBedrijf: ".$bedrijfNaam."\nTelefoon: ".$tel."\nBericht: ".$berichtFrm;
'Reply-To: '.$email."\r\n" .
//  mail($email_to,"Contact from ",$naam,$naam,$berichtFrm,$headers);
 mail($email_to, $email_subject, $tekst, $headers);
 header('Location: ../index.html?sent');
 exit();
//  mail($data);
// echo"Uw bericht werd verstuurd.";
?>