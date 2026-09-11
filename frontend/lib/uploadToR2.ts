

export async function uploadFileToR2(
    file: File,
    uploadUrl: string
) {
    const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
        },
        body: file,
    });

    if (!response.ok) {
        throw new Error("Échec de l'upload");
    }
}