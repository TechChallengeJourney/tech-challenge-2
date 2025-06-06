import { NextResponse } from "next/server";
import { fetchUsers, updateUser } from "../../../actions/users";
import bcrypt from 'bcrypt';

export async function PUT(request: Request) {
  try {
    const userData = await request.json();
    const user = await fetchUsers(userData.id);

    if(user) {
      const password = await (userData.password) ? await bcrypt.hash(userData.password, 10) : user.password;

      const userUpdated = {...userData, password};
      const response = await updateUser(userUpdated);
    
      if (response.ok) {
        return NextResponse.json({data: userUpdated, message: 'Usuário atualizado com sucesso!'}, { status: 200 });
      } else {
        return NextResponse.json(
          { error: 'Ocorreu um erro, tente novamente mais tarde por favor!' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json({ error: 'Usuário não encontrado, tente novamente por favor!' }, { status: 500 });
    }
  
  } catch {
    return NextResponse.json({ error: 'Ocorreu um erro, tente novamente mais tarde por favor!' }, { status: 500 });
  }
}
