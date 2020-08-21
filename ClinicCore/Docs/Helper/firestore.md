#Permissões

## Acesso total

	service cloud.firestore {
	  match /databases/{database}/documents {
		match /{document=**} {
		  allow read, write;
		}
	  }
	}

## Logado

Acessa todos os documentos se estiver logado

	service cloud.firestore {
	  match /databases/{database}/documents {
		match /{document=**} {
		  allow read, write: if request.auth.uid != null;
		}
	  }
	}

## Token

Acesso baseado em tokens

	service cloud.firestore {
	  match /databases/{database}/documents {
		match /test/{document} {
			allow read: if request.auth.token.admin == true;
		}
	  }
	}

## Acesso a dados

Permissões utilizando dados da tabela

    service cloud.firestore {
      match /databases/{database}/documents {
        match /{document=**} {
          allow write : if get(/databases/$(database)/documents/users/$(request.auth.uid))
          .data.isAdmin == true;
          }
      }
    }

##Links

 - [AIM Configuration](https://console.developers.google.com/apis/api/iam.googleapis.com/overview?project=cliniccoredb)
 - [Rules In Firebase](https://maye.pwafire.org/articles/firebase-cloud-security-firestore-rules/)