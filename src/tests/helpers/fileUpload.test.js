import cloudinary  from "cloudinary";

import { fileUpload } from "../../helpers/fileUpload";


    cloudinary.config({ 
        cloud_name: 'dkrmpxrnl', 
        api_key: '781448825212465', 
        api_secret: 'gHHpKkuruzCnFqvbQUi8djp9IrA',
        secure: true
    });


    describe("Pruebas el fileUpload", () => {
      
        test("debe de cargar el archivo y retornar el URL", async ( ) => {
            
            const resp = await fetch("https://farm6.staticflickr.com/5566/14869146856_02827a4968.jpg");
            const blob = await resp.blob();

            const file = new File([blob], "foto.png");
            const url = await fileUpload(file);
        
            expect(typeof url).toBe('string');

            const segments = url.split('/');
            const imageId = segments[segments.length - 1].replace('.jpg', '');


            await cloudinary.v2.api.delete_resources(imageId, {}, () => {
                console.log("Se elimino la imagen");
            });
        
        })

        test("debe de retornar un error (null)", async () => {
            const file = new File([], "foto.png");
            const url = await fileUpload(file);
            expect(url).toBe(null);
        });

});
