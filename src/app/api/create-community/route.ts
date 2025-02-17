import { supabase } from "@/app/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Extraia o token JWT do cabeçalho da requisição
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token de autenticação ausente" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // Verifique o token JWT usando o Supabase Auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json(
        { error: "Usuário não autenticado" },
        { status: 401 }
      );
    }

    // Extraia os dados do corpo da requisição
    const { name, description, tags, location, image_url } = await req.json();

    // Validação básica
    if (!name || !description || !tags || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: "Dados inválidos ou incompletos" },
        { status: 400 }
      );
    }

    // Insere a nova comunidade no banco de dados
    const { data, error } = await supabase
      .from("comunidades")
      .insert([
        {
          name,
          description,
          tags,
          location,
          image_url,
          created_by: user.id,
        },
      ])
      .select(); // Adicione .select() para retornar os dados inseridos

    if (error) {
      console.error("Erro ao criar comunidade:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Comunidade criada com sucesso", data },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
